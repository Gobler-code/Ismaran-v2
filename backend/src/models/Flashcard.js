const mongoose = require('mongoose');

const flashcardSchema = new mongoose.Schema(
    {
        question:{
            type: String,
            required:[true, 'Title is required'],
        },
        answer:{
            type: String,
            required : [true,'Content is required'],
        },
        document:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Document',
            required:true,
        },
       user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
       }
    },
    {timestamps:true}
);

module.exports = mongoose.model('Flashcard', flashcardSchema);