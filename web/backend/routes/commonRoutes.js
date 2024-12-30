import express from 'express';
import { registerUser, loginUser } from '../controllers/auth'

const router = express.Router();

router.post('/api/register', registerUser);
router.post('/api/register', loginUser);

export default router;