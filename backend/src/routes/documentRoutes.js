const express = require('express');
const router = express.Router();
const protect  = require('../middleware/authMiddleware');

const {createDocument,getDocuments,getDocument,deleteDocument} = require('../controllers/documentController');

router.post('/',protect,createDocument);
router.get('/',protect,getDocuments);
router.get('/:id',protect,getDocument);
router.delete('/:id',protect,deleteDocument);

module.exports = router;