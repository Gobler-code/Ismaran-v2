const express = require('express');
const router = express.Router();
const protect  = require('../middleware/authMiddleware');

const { generateFlashcards, 
    generateQuiz, 
    generateHighlight, 
    generateVocab } = require('../controllers/aiController');

router.post('/flashcards/:documentId',protect,generateFlashcards);
router.post('/quiz/:documentId',protect,generateQuiz);
router.post('/highlights/:documentId',protect,generateHighlight);
router.post('/vocab/:documentId',protect,generateVocab);

module.exports = router;