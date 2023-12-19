import express from 'express';
import {
  getRelationship,
  addRelationship,
  deleteRelationship,
} from '../controllers/relationship.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/', verifyToken, getRelationship);
router.post('/', verifyToken, addRelationship);
router.delete('/', verifyToken, deleteRelationship);

export default router;
