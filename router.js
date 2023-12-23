
import express from 'express';

import openaiController from './controllers/openaiController.js';
import googleGenerativeAiController from './controllers/googleGenerativeAiController.js';

 const router = express.Router();

router.use('/chatgpt', openaiController);
router.use('/gemini', googleGenerativeAiController);

export default router
