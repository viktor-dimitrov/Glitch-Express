import 'dotenv/config';
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import router from './router.js';

const app = express();
const PORT = process.env.PORT || 8000;

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


  app.get('/', (req, res) => {
    res.send("<h1>Glitch-Express Server is OK. MongoDb is Connected.</h1>");
})


  connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`)
    })
})


