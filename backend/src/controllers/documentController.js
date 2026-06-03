const Document = require('../models/Document');

const createDocument = async(req,res,next) =>{
    try{
        const {title, content} = req.body;

        const userId = req.user.id;

        const document = await Document.create({
              title,
              content,
              user: userId
        })
        res.status(201).json({
            success: true,
            data:{document}
        })
    }catch(error){
        next(error);
    }
}
const getDocuments = async (req,res,next) =>{
    try{
        const documents = await Document.find({user: req.user.id});
        res.status(200).json({
    success: true,
    data: { documents }
});

    }catch(error){
        next(error);
    }
}
const getDocument = async(req,res,next)=>{
    try{
        const singleDocument = await Document.findById(req.params.id);
        if(!singleDocument) {
    return res.status(404).json({
        success: false,
        error: 'Document not found'
    });
}
          res.status(200).json({
    success: true,
    data: { singleDocument }
});
    }catch(error){
        next(error);
    }
}

const deleteDocument = async(req,res,next) => {
    try{
        const document = await Document.findById(req.params.id);
        
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

        await document.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Document deleted'
        });

    }catch(error){
        next(error);
    }
}


module.exports = {createDocument,getDocuments,getDocument,deleteDocument};