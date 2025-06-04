import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './serviceWorkerRegistration.js'; // registers workbox build output

createRoot(document.getElementById('root')).render(<App />);
