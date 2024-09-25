import express from 'express';
import { signup, signin } from '../controllers/auth.controller.js';

const router = express.Router();

// POST request to /api/auth/signup
router.post("/signup", signup)

//route for signin

router.post("/signin", signin);

//route for forgot password

export default router;  
