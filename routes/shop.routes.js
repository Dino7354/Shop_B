import express from 'express';
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

const router = express.Router();

// Initialize OpenAI
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Test route
router.route('/').get((req, res) => {
  res.status(200).json({ message: 'Hello from Shop B!' });
});

// Image generation route
router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt || prompt.trim() === '') {
      return res.status(400).json({ message: 'Prompt is required' });
    }

    console.log('Generating image for prompt:', prompt);

    const response = await openai.createImage({
      prompt,
      n: 1,
      size: '1024x1024',
      response_format: 'b64_json',
    });

    const image = response.data.data[0].b64_json;
    res.status(200).json({ photo: image });
  } catch (error) {
    console.error('DALL·E API error:', error?.response?.data || error.message || error);
    res.status(500).json({
      message: 'Something went wrong while generating the image',
      error: error?.response?.data || error.message,
    });
  }
});

export default router;
