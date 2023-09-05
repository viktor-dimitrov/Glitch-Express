
import express from 'express';

import openaiController from './controllers/openaiController.js';

 const router = express.Router();

router.use('/', openaiController);

export default router
