const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req,res,next) =>{
    try{
        const authHeader = req.headers.authorization;

        if(!authHeader || !authHeader.startsWith('Bearer')){
            return res.status(401).json({
                success: false,
                error: 'No token provided'
            })
        }

        const token = authHeader.split(' ')[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await User.findById(decoded.id).select('-password');
        if(!req.user) {
         return res.status(401).json({
           success: false,
           error: 'User no longer exists'
           });
           }
        next();
    }catch(error){
        res.status(401).json({
            success:false,
            error: 'Token invalid or expired'

        })
    }
}
module.exports = protect;