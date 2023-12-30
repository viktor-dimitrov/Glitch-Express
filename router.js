
import express from 'express';

import openaiController from './controllers/openaiController.js';
import googleGenerativeAiController from './controllers/googleGenerativeAiController.js';
import socketController from './controllers/socketController.js';

 const router = express.Router();

router.use('/chatgpt', openaiController);
router.use('/gemini', googleGenerativeAiController);
router.use('/chatroom', openaiController);

export default router
