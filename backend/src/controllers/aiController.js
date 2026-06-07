const Groq = require('groq-sdk');
const Document = require('../models/Document');
const Flashcard = require('../models/Flashcard');
const Quiz = require('../models/Quiz');
const Vocab = require('../models/Vocab');
const Highlight = require('../models/Highlight');


const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Calculate how many items to generate based on text length
const calculateItemCount = (text) => {
  const wordCount = text.trim().split(/\s+/).length;
  const flashcardCount = Math.min(30, Math.max(5, Math.floor(wordCount / 100)));
  const quizCount = Math.min(20, Math.max(5, Math.floor(wordCount / 150)));
  const highlightCount = Math.min(15, Math.max(5, Math.floor(wordCount / 80)));
  return { flashcardCount, quizCount, highlightCount };
};

const parseJSONResponse = (text) => {
  let cleanText = text.trim();
  if (cleanText.startsWith('```json')) {
    cleanText = cleanText.replace(/```json\n?/, '').replace(/```\s*$/, '');
  } else if (cleanText.startsWith('```')) {
    cleanText = cleanText.replace(/```\n?/, '').replace(/```\s*$/, '');
  }
  return JSON.parse(cleanText);
};

const generateFlashcards = async (req, res, next) => {
    try {
          const document = await Document.findById(req.params.documentId);

           if(!document) {
            return res.status(404).json({
        success: false,
        error: 'Document not found'
            });
           }
          if(document.user.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                error: 'Not authorized'
            });
        }
        const {flashcardCount} = calculateItemCount(document.content);
        
          const prompt = `Based on the following text, generate exactly ${flashcardCount} flashcards as question-answer pairs. 
The number of flashcards is based on the content length to ensure comprehensive coverage.

Format your response as a JSON array with objects containing "question" and "answer" fields.
Make questions clear and concise, and answers comprehensive but not too long.

Example format:
[
  {"question": "What is...", "answer": "It is..."},
  {"question": "How does...", "answer": "It works by..."}
]

Text to analyze:
${document.content}

Respond ONLY with the JSON array, no additional text.`;
        
const response = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.3,
    max_tokens: 4096
});

const text = response.choices[0].message.content;
const flashcards = parseJSONResponse(text);

const flashcardsToSave = flashcards.map(card => ({
    question: card.question,
    answer: card.answer,
    document: document._id,
    user: req.user.id
}));

const savedFlashcards = await Flashcard.insertMany(flashcardsToSave);

    return res.status(200).json({
        success: true,
        data: {flashcards: savedFlashcards}
    })
    } catch(error) {
        next(error);
    }
};

const getFlashcards = async (req,res,next) =>{
    try{
        const flashcards = await Flashcard.find({document: req.params.documentId,user: req.user.id});
        res.status(200).json({
    success: true,
    data: { flashcards }
});
    }catch(error){
        next(error)
    }
}
const generateQuiz = async (req,res,next) =>{
    try{
        const document = await Document.findById(req.params.documentId);

           if(!document) {
            return res.status(404).json({
        success: false,
        error: 'Document not found'
            });
           }
          if(document.user.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                error: 'Not authorized'
            });
        }
        const {quizCount} = calculateItemCount(document.content);
          const prompt = `Based on the following text, generate exactly ${quizCount} multiple-choice quiz questions.
The number of questions is based on the content length to ensure proper assessment coverage.

Format your response as a JSON array with objects containing "question", "options" (array of 4 choices), and "answer" (the correct option).

Example format:
[
  {
    "question": "What is the main topic?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "answer": "Option A"
  }
]

Text to analyze:
${document.content}

Respond ONLY with the JSON array, no additional text.`;

const response = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.3,
    max_tokens: 4096
});
const text = response.choices[0].message.content;
const quiz = parseJSONResponse(text);

const quizToSave = quiz.map(card => ({
    question: card.question,
    options: card.options,
    correctAnswer: card.answer,
    document: document._id,
    user: req.user.id
}));
const savedQuiz = await Quiz.insertMany(quizToSave);

    return res.status(200).json({
        success: true,
        data: {quiz: savedQuiz}
    })

    }catch(error){
        next(error)
    }
} 

  const getQuiz = async (req,res,next) =>{
    try{
        const quizs = await Quiz.find({document: req.params.documentId,user: req.user.id});
        res.status(200).json({
    success: true,
    data: {quizs }
});
    }catch(error){
        next(error)
    }
}

 const generateHighlight = async (req,res,next) =>{
    try{
        const document = await Document.findById(req.params.documentId);

           if(!document) {
            return res.status(404).json({
        success: false,
        error: 'Document not found'
            });
           }
          if(document.user.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                error: 'Not authorized'
            });
        }
        const {highlightCount} = calculateItemCount(document.content);
   const prompt = `You are helping build a Smart Highlight Generator feature for a study app. The user has provided text extracted from educational material. Your job is to analyze the content and return a structured list of only the most important points — not the entire text — grouped into three categories of importance.

🎯 GOAL
Summarize the text into clear, study-ready highlight points that represent only the essential ideas or facts. Do not include the whole text or random phrases. Each highlight must be concise, self-contained, and valuable for revision.

📚 CATEGORIES
Each point must belong to one of these three categories:

1. **Sure Exam Question** → Core concepts, definitions, formulas, key facts, or main ideas that are very likely to be asked in exams.
2. **Important** → Key explanations, examples, processes, or supporting facts that are necessary for understanding.
3. **Less Important** → Contextual information, historical background, or secondary details that are good to know but not crucial.

🎨 OUTPUT FORMAT
Return a valid JSON array with this structure:
[
  {
    "text": "Concise and clear important point.",
    "category": "Sure Exam Question",
    "color": "#FFD700"
  }
]

Use these EXACT colors:
- Sure Exam Question → #FFD700 (gold)
- Important → #90EE90 (light green)
- Less Important → #ADD8E6 (light blue)

Target ${highlightCount} highlights. Return ONLY the JSON array.

Text to analyze:
${document.content}`;

const response = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.3,
    max_tokens: 4096
});

const text = response.choices[0].message.content;
const highlights = parseJSONResponse(text);

const hightlightsToSave = highlights.map(card => ({
    text: card.text,
    category: card.category,
    color: card.color,
    document: document._id,
    user: req.user.id
}));
const savedHighlight = await Highlight.insertMany(hightlightsToSave);

    return res.status(200).json({
        success: true,
        data: {highlight: savedHighlight}
    })

    }catch(error){
        next(error)
    }
}

const getHighlight = async (req,res,next) =>{
    try{
        const highlights = await Highlight.find({document: req.params.documentId,user: req.user.id});
        res.status(200).json({
    success: true,
    data: { highlights }
});
    }catch(error){
        next(error)
    }
}

const generateVocab = async (req,res,next) =>{
    try{
        const {words} = req.body;
        const document = await Document.findById(req.params.documentId);

           if(!document) {
            return res.status(404).json({
        success: false,
        error: 'Document not found'
            });
           }
          if(document.user.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                error: 'Not authorized'
            });
        }
      
     const prompt = `Based on the following terms, provide detailed vocabulary insights for each word.

Terms: ${words.join(', ')}

For EACH term, provide:
1. A clear, concise definition
2. 2-3 example sentences demonstrating CORRECT usage
3. 1 example sentence demonstrating INCORRECT or common misuse

Format your response as a JSON array with this EXACT structure:
[
  {
    "word": "photosynthesis",
    "definition": "The process by which plants convert light energy into chemical energy",
    "correctExamples": [
      "Plants use photosynthesis to create their own food from sunlight.",
      "Chlorophyll plays a crucial role in photosynthesis.",
      "Without photosynthesis, there would be no oxygen in our atmosphere."
    ],
    "incorrectExample": "I'm going to photosynthesis my homework tonight."
  }
]

IMPORTANT: 
- Provide insights for ALL ${words.length} terms
- Use the exact field names: "word", "definition", "correctExamples", "incorrectExample"
- correctExamples must be an array of 2-3 strings
- Make examples realistic and educational

Respond ONLY with the JSON array, no additional text or markdown.`;

const response = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.3,
    max_tokens: 4096
});

const text = response.choices[0].message.content;
const vocabs = parseJSONResponse(text);

const vocabsToSave = vocabs.map(card => ({
    vocabulary: card.word,
    definition: card.definition,
    correctSentence: card.correctExamples,
    incorrectSentence: card.incorrectExample,
    document: document._id,
    user: req.user.id
}));
const savedVocab = await Vocab.insertMany(vocabsToSave);

    return res.status(200).json({
        success: true,
        data: {vocab: savedVocab}
    })

    }catch(error){
        next(error)
    }
}

const getVocab = async (req,res,next) =>{
    try{
        const vocabs = await Vocab.find({document: req.params.documentId,user: req.user.id});
        res.status(200).json({
    success: true,
    data: { vocabs}
});
    }catch(error){
        next(error)
    }
}

module.exports = { 
    generateFlashcards, 
    generateQuiz, 
    generateHighlight, 
    generateVocab,
    getFlashcards,
    getQuiz,
    getHighlight,
    getVocab
};




