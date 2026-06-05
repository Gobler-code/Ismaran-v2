const mongoose = require('mongoose');

const highlightSchema = new mongoose.Schema(
    {
        text:{
            type: String,
            required:[true, 'Text is required'],
        },
        category: {
             type: String,
            required: [true, 'Category is required'],
        },
        color: {
             type: String,
             required: [true, 'Color is required'],
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

module.exports = mongoose.model('Highlight', highlightSchema);