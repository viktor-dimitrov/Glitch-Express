
import express from 'express';

import openaiControler from './controllers/openaiController.js';

 const router = express.Router();

router.use('/', openaiControler);

export default router
