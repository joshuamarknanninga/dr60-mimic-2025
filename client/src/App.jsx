import React, { useState } from 'react';
import RecorderControls from './components/RecorderControls.jsx';
import AudioPlayer from './components/AudioPlayer.jsx';

export default function App() {
  const [audioURL, setAudioURL] = useState(null);

  return (
    <main style={styles.main}>
      <h1 style={styles.h1}>Panasonic DR-60 Mimic</h1>
      <RecorderControls onReady={setAudioURL} />
      <AudioPlayer src={audioURL} />
    </main>
  );
}

const styles = {
  main: { textAlign: 'center', fontFamily: 'system-ui', marginTop: '8vh' },
  h1: { fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)', color: '#e0e0e0' }
};
