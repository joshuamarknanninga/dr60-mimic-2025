import React from 'react';

export default function AudioPlayer({ src }) {
  if (!src) return null;
  return (
    <div style={{ marginTop: '2rem' }}>
      <audio controls src={src} style={{ width: '90%' }} />
    </div>
  );
}
