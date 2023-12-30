import express from 'express';
import { Server } from 'socket.io';


const router = express.Router();



router.get('/', async (req, res) => {






    res.status(200).json({ok:true, ai:'socket'});
})






export default router