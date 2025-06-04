import Recording from '../models/Recording.js';
import path from 'node:path';
import fs from 'node:fs';

export const uploadRecording = async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

  const { filename, path: filePath } = req.file;
  const recording = await Recording.create({ filename, path: filePath });
  res.status(201).json(recording);
};

export const getRecording = async (req, res) => {
  const rec = await Recording.findById(req.params.id);
  if (!rec) return res.status(404).json({ error: 'Not found' });
  res.sendFile(path.resolve(rec.path));
};

export const listRecordings = async (_req, res) => {
  const recs = await Recording.find().sort({ createdAt: -1 });
  res.json(recs);
};

export const deleteRecording = async (req, res) => {
  const rec = await Recording.findById(req.params.id);
  if (!rec) return res.status(404).json({ error: 'Not found' });
  await fs.promises.unlink(rec.path);
  await rec.deleteOne();
  res.status(204).end();
};
