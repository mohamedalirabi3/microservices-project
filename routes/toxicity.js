const express = require('express');
const router = express.Router();


const badWords = ['stupid', 'idiot', 'dumb', 'fool', 'hate', 'jerk', 'loser', 'rude', 'nasty', 'annoying'];

router.post('/', (req, res) => {
  const { text } = req.body;

  
  if (!text || typeof text !== 'string') {
    return res.status(400).json({ error: 'Text is required and must be a string' });
  }

  let toxic = false;
  let score = 0;
  const foundWords = [];

  badWords.forEach(word => {
    if (text.toLowerCase().includes(word)) {
      toxic = true;
      score += 0.25;
      foundWords.push(word);
    }
  });

  res.json({
    toxic,
    score: toxic ? Math.min(score, 1) : 0,
    toxicWords: foundWords
  });
});

module.exports = router;