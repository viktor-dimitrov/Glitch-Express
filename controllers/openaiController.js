import express from 'express';
import OpenAI  from "openai";
import 'dotenv/config';

const router = express.Router();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})

router.get('/ai', async (req, res) => {
        res.status(200).json({ok:true});
})

router.post('/ai', async (req, res) => {
 
  console.log(req.body)

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
 

export default router