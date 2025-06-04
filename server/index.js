import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { config } from 'dotenv';
import { connectDB } from './config/db.js';
import recordingsRouter from './routes/recordings.js';
import path from 'node:path';
config();          // loads .env

await connectDB();

const app = express();
app.use(cors());
app.use(morgan('dev'));

// API
app.use('/api/recordings', recordingsRouter);

// serve React build in prod
if (process.env.NODE_ENV === 'production') {
  const buildPath = path.resolve('client', 'dist');
  app.use(express.static(buildPath));
  app.get('*', (_, res) => res.sendFile(path.join(buildPath, 'index.html')));
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
