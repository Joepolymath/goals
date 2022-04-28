const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const protect = asyncHandler(async (req, res, next) => {
       let token;

       // checking if authorization exists in the header and if the authorization starts with "Bearer"
       if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
              try {
                     // get token from header
                     token = req.headers.authorization.split(' ')[1];
                     
                     // verify token
                     const decoded = jwt.verify(token, process.env.JWT_SECRET);

                     // Get user from the token
                     req.user = await User.findById(decoded.id).select('-password');
                     console.log("Authorized")
                     next()
              } catch (error) {
                     console.log(error)
                     res.status(401)
                     throw new Error('Not authorized')
              }
       }

       if(!token){
              res.status(401);
              throw new Error('Not authorized, No token');
       }
       // console.log('hey')
})

module.exports = {protect};