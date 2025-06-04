self.onmessage = ({ data }) => {
    const samples = data.buffer;
    const out = new DataView(new ArrayBuffer(44 + samples.length * 2));
  
    const writeStr = (o, s) => [...s].forEach((c, i) => out.setUint8(o + i, c.charCodeAt(0)));
    writeStr(0, 'RIFF');
    out.setUint32(4, 36 + samples.length * 2, true);
    writeStr(8, 'WAVEfmt ');
    out.setUint32(16, 16, true);
    out.setUint16(20, 1, true);
    out.setUint16(22, 1, true);
    out.setUint32(24, 8000, true);
    out.setUint32(28, 8000 * 2, true);
    out.setUint16(32, 2, true);
    out.setUint16(34, 16, true);
    writeStr(36, 'data');
    out.setUint32(40, samples.length * 2, true);
  
    let off = 44;
    samples.forEach(s => {
      const clamped = Math.max(-1, Math.min(1, s));
      out.setInt16(off, clamped < 0 ? clamped * 0x8000 : clamped * 0x7fff, true);
      off += 2;
    });
  
    self.postMessage(out.buffer, [out.buffer]);
  };
  