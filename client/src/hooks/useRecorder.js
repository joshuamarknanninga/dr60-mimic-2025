/* eslint-disable no-console */
import { useState, useRef } from 'react';
import { degradeAudio } from '../utils/audioProcessing.js';
import axios from 'axios';

export const useRecorder = ({ onProcessed }) => {
  const [recording, setRecording] = useState(false);
  const mediaRecorder = useRef(null);
  const chunks = useRef([]);

  const start = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream, { mimeType: 'audio/webm' });
      mediaRecorder.current.ondataavailable = e => chunks.current.push(e.data);
      mediaRecorder.current.start();
      setRecording(true);
    } catch (err) {
      alert('Microphone permission denied.');
    }
  };

  const stop = () =>
    new Promise(resolve => {
      mediaRecorder.current.onstop = async () => {
        const blob = new Blob(chunks.current, { type: 'audio/webm' });
        chunks.current = [];
        const degraded = await degradeAudio(blob);

        // POST to API
        const formData = new FormData();
        formData.append('audio', degraded, 'dr60.wav');
        const { data } = await axios.post('/api/recordings', formData);

        const url = `/api/recordings/${data._id}`;
        onProcessed?.(url);
        resolve();
      };
      mediaRecorder.current.stop();
      setRecording(false);
    });

  return { start, stop, recording };
};
