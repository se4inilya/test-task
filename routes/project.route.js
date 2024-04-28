import express from 'express';
import multer from 'multer';
import projectController from '../controllers/project.controller';
const router = express.Router();
const uploadFile = multer({ storage: multer.memoryStorage() }).single('file');

router.post('/', uploadFile, projectController.uploadProjects);
router.get('/', projectController.getProjects);


export default router;