const mongoose = require('mongoose');

const vocabSchema = new mongoose.Schema(
    {
        vocabulary:{
            type: String,
            required:[true, 'Title is required'],
        },
        definition:{
            type: String,
            required:[true,'Sentence is required'],
        },
        correctSentence:{
            type: [String],
            required : [true,'Sentence is required'],
        },
        incorrectSentence:{
               type: [String],
               required: [true,'Sentence is required'],
               
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

module.exports = mongoose.model('Vocab', vocabSchema);