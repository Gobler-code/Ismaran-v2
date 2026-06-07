const express = require('express');
const router = express.Router();
const protect  = require('../middleware/authMiddleware');

const { generateFlashcards, 
    generateQuiz, 
    generateHighlight, 
    generateVocab,
    getFlashcards,
    getQuiz,
    getHighlight,
    getVocab } = require('../controllers/aiController');

router.post('/flashcards/:documentId',protect,generateFlashcards);
router.post('/quiz/:documentId',protect,generateQuiz);
router.post('/highlights/:documentId',protect,generateHighlight);
router.post('/vocab/:documentId',protect,generateVocab);



router.get('/flashcards/:documentId', protect, getFlashcards);
router.get('/quiz/:documentId', protect, getQuiz);
router.get('/highlights/:documentId', protect, getHighlight);
router.get('/vocab/:documentId', protect, getVocab);
module.exports = router;