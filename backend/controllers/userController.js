const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

// @Desc      Register user
// @route     POST /api/users
// @access    Public
const registerUser = asyncHandler(async(req, res) => {
       const {name, email, password} = req.body;

       if(!name || !email || !password){
              res.status(400);
              throw new Error('Please add all fields')
       }

       // check if user exists
       const userExists = await User.findOne({email});
       if(userExists){
              res.status(400);
              throw new Error('User already exists');
       }

       // Hash password
       const salt = await bcrypt.genSalt(10);
       const hashedPassword = await bcrypt.hash(password, salt);

       // create user
       const user = await User.create({
              name,
              email,
              password: hashedPassword
       })

       if(user){
              res.status(201).json({status: true, message: 'User created', data:{
                     _id: user._id,
                     name: user.name,
                     email: user.email,
                     token: generateToken(user._id, user.email)
              }})
       }else{
              res.status(400);
              throw new Error('Invalid User data')
       }
})
// @Desc      Get user data
// @route     GET /api/users/me
// @access    Private
const getMe = asyncHandler(async(req, res) => {
       // const {_id, name, email} = await User.findById(req.user.id)
       const {_id, name, email} = req.user
       console.log(email)
       res.status(200).json({status: true, message: "User Details Retrieved", data:{_id,name, email}});
})


// ========================================================================
// @Desc      Authenticate a User
// @route     POST /api/users/login
// @access    Public
const loginUser = asyncHandler(async(req, res) => {
       const {email, password} = req.body;
       const user = await User.findOne({email});
       if(!email || !password){
              res.status(400);
              throw new Error('Enter both email and password');
       }
       if(user && (await bcrypt.compare(password, user.password))){
              res.status(200).json({status: true, message: "Logged in Successfully", data: {
                     _id: user._id,
                     name: user.name,
                     email: user.email,
                     token: generateToken(user._id, user.email)
              }})
       }else{
              res.status(400);
              throw new Error('Invalid Credentials')
       }
})


// Generate JWT
const generateToken = (id, email) => {
       return jwt.sign({id, email}, process.env.JWT_SECRET, {
              expiresIn: '30d'
       })
}

module.exports = {
       registerUser,
       getMe,
       loginUser
}