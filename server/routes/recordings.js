import { Router } from 'express';
import multer from 'multer';
import path from 'node:path';
import {
  uploadRecording,
  getRecording,
  listRecordings,
  deleteRecording
} from '../controllers/recordingController.js';

const router = Router();
const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, 'server/uploads'),
  filename: (_, file, cb) =>
    cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`)
});
const upload = multer({ storage, limits: { fileSize: 12 * 1024 * 1024 } }); // 12 MB max

router
  .route('/')
  .post(upload.single('audio'), uploadRecording)
  .get(listRecordings);

router
  .route('/:id')
  .get(getRecording)
  .delete(deleteRecording);

export default router;
