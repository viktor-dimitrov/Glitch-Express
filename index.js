import * as dotenv from 'dotenv';
import OpenAI  from "openai";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import readline from "readline";

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})


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


app.post('/chat-completion', async (req, res) => {
 
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: req.body.message }],
      });

      const reply = response.choices[0].message.content;
  
      console.log(reply);

      res.json({ reply });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });


  connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`)
    })
})


