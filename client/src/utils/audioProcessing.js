export async function degradeAudio(blob) {
    const arrayBuffer = await blob.arrayBuffer();
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const orig = await ctx.decodeAudioData(arrayBuffer);
  
    // 1. down-sample & filter
    const off = new OfflineAudioContext(
      orig.numberOfChannels,
      orig.duration * 8_000,
      8_000 // Panasonic DR-60 ~8 kHz
    );
  
    const source = off.createBufferSource();
    source.buffer = orig;
  
    const lp = off.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 3400; // DR-60 rolls off above ~3.4 kHz
  
    source.connect(lp).connect(off.destination);
    source.start(0);
    const rendered = await off.startRendering();
  
    // 2. μ-law compand & inject noise / clicks
    const data = rendered.getChannelData(0);
    for (let i = 0; i < data.length; i++) {
      // μ-law 4-bit approximation
      const μ = 255;
      const sign = Math.sign(data[i]);
      const mag = Math.log(1 + μ * Math.abs(data[i])) / Math.log(1 + μ);
      data[i] = sign * mag;
  
      // random noise bursts (~5% chance)
      if (Math.random() < 0.05) data[i] += (Math.random() - 0.5) * 0.4;
    }
  
    // 3. encode to WAV via worker
    const wavBlob = await bufferToWaveBlob(rendered);
    return wavBlob;
  }
  
  function bufferToWaveBlob(buffer) {
    return new Promise(res => {
      const worker = new Worker(new URL('./waveWorker.js', import.meta.url));
      worker.postMessage({ buffer: buffer.getChannelData(0) }, [
        buffer.getChannelData(0).buffer
      ]);
      worker.onmessage = e => res(new Blob([e.data], { type: 'audio/wav' }));
    });
  }
  