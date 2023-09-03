import * as dotenv from 'dotenv';
import OpenAI  from "openai";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import readline from "readline";
dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})


const app = express();
const port = 8000;
app.use(bodyParser.json());
app.use(cors());


app.post('/chat-completion', async (req, res) => {
    console.log(req.body)
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: req.body.message }],
      });

     
  
      const reply = response.data.choices[0].message.content;
      res.json({ reply });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

app.listen(port, () => {
    console.log(`listening on port ${port}`);

  });

