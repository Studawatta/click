import express from 'express';
import { getPosts, addPosts } from '../controllers/post.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/', verifyToken, getPosts);
router.post('/', verifyToken, addPosts);

export default router;
