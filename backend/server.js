const express = require('express');
const dotenv = require('dotenv').config();
const {errorHandler} = require('./middlewares/errorMiddleware');
const saySomething = require('./middlewares/logger');
const {protect} = require('./middlewares/authMiddleware');
const colors = require('colors');
const connectDB = require('./config/db');

const port = process.env.PORT || 5000;

// invoking database function
connectDB();

const app = express();

// body parser
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api/goals', require('./routes/goalRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

app.use(errorHandler);
// app.use(saySomething)

app.listen(port, ()=>{
       console.log(`Server started on port ${port}`)
})