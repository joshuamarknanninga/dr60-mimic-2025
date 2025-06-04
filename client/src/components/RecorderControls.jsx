import React from 'react';
import { useRecorder } from '../hooks/useRecorder.js';

export default function RecorderControls({ onReady }) {
  const { start, stop, recording } = useRecorder({ onProcessed: onReady });

  return (
    <>
      <button onClick={recording ? stop : start} style={styles.btn}>
        {recording ? '■ Stop' : '● Record'}
      </button>
    </>
  );
}

const styles = {
  btn: {
    fontSize: '1.25rem',
    padding: '0.8rem 2rem',
    borderRadius: '0.4rem',
    background: '#202020',
    color: '#e0e0e0',
    border: '2px solid #404040',
    cursor: 'pointer'
  }
};
