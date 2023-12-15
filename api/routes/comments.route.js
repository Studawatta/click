import express from 'express';
import {
  getComments,
  writeComment,
} from '../controllers/comment.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/', getComments);
router.post('/', verifyToken, writeComment);

export default router;
