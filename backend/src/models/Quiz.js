const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema(
    {
        question:{
            type: String,
            required:[true, 'Title is required'],
        },
        options:{
            type: [String],
            required : [true,'Option is required'],
        },
        correctAnswer:{
               type: String,
               require: [true,'Option is required'],
               
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

module.exports = mongoose.model('Quiz', quizSchema);