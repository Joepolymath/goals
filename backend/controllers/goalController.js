const asyncHandler = require('express-async-handler');

// @desc      Get goals
// @route     GET /api/goals
// @access    Private
const getGoals = asyncHandler(async (req, res) => {
       res.status(200).json({message: "Get Goals"});
})


// @desc      Create goal
// @route     POST /api/goals
// @access    Private
const createGoal = asyncHandler(async (req, res) => {
       if(!req.body.text){
              // res.status(400).json({message:"Please add a text"});
              // or
              res.status(400);
              throw new Error('Please add a text');
       }
       res.status(200).json({message: "Post Goals"});
})


// @desc      Update goal
// @route     PUT /api/goals/:id
// @access    Private
const updateGoal = asyncHandler(async (req, res) => {
       res.status(200).json({message:`Update goal ${req.params.id}`});
})


// @desc      Delete goal
// @route     DELETE /api/goals/:id
// @access    Private
const deleteGoal = asyncHandler(async (req, res) => {
       res.status(200).json({message: `Delete Goal ${req.params.id}`})
})
module.exports = {
       getGoals,
       createGoal,
       updateGoal,
       deleteGoal
}