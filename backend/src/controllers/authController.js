const jwt = require('jsonwebtoken');
const User = require('../models/User');

const signup = async (req,res,next) =>{
    try{
        const {email, password} = req.body;

        const existingUser = await User.findOne({email});
        if(existingUser){
           return res.status(400).json({
            success: false,
            error: 'Email already registered'
              })
        }


        const user = await User.create({email, password});

        const token = jwt.sign(
            {id: user._id},
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN}
        );

         res.status(201).json({
        success: true,
         data: {
          token,
          user: {
            id: user._id,
            email: user.email
        }
        }
      })
    } catch (error){
        next(error);
    }
};

  const login = async (req,res,next) => {
      try{
        const {email, password} = req.body;

        const user = await User.findOne({ email });
        if(!user){
            return res.status(401).json({
                success: false,
                error: 'Invalid credentials'
            });
        }
        
        const isMatch = await user.comparePassword(password);
        if(!isMatch){
            return res.status(401).json({
                success: false,
                error: 'Invalid credentials'
            });
        }

        const token = jwt.sign(
            {id: user._id},
            process.env.JWT_SECRET,
            {expiresIn: process.env.JWT_EXPIRES_IN}
        );
         res.status(200).json({
        success: true,
         data: {
          token,
          user: {
            id: user._id,
            email: user.email
        }
        }
      })
      }catch (error){
        next(error);
      }

  };
  module.exports = {signup, login};