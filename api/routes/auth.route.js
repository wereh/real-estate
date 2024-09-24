import express from 'express';
import { signup } from '../controllers/auth.controller.js';

const router = express.Router();

// POST request to /api/auth/signup
router.post("/signup", signup)

export default router;  
