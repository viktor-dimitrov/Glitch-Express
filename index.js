import 'dotenv/config';
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import router from './router.js';

import { Server } from 'socket.io';
import { createServer } from 'http';

const app = express();



const PORT = process.env.PORT || 3000;

mongoose.set('strictQuery', false);

const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDb Connected: ${conn.connection.host} `);
    }catch(error){
        console.log(error);
        process.exit(1);
    }
}

app.use(bodyParser.json());
app.use(cors());
app.use(router);

const server = createServer(app); 

const io = new Server(server, {  cors: {
    origin: 'http://localhost:5173', // replace with the actual origin of your React app
    methods: ['GET', 'POST'],
  },});

 
io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('sendMessage', (message) => {
       io.emit('reciveMessage', message);
        console.log(message) 
    });
  
    socket.on('disconnect', () => {
      console.log('User disconnected');
    }); 
  });  


//   app.get('/', (req, res) => {
//     res.send("<h1>Glitch-Express Server is OK. MongoDb is Connected.</h1>");
// })

  connectDB().then(() => {
    server.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`)
    })
})



