const asyncHandler = require('express-async-handler');
const Goal = require('../models/goalModel');

// @desc      Get goals
// @route     GET /api/goals
// @access    Private
const getGoals = asyncHandler(async (req, res) => {
       const goals = await Goal.find();
       res.status(200).json(goals);
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

       const goal = await Goal.create({
              text: req.body.text
       })
       res.status(200).json({status: true, goal: goal});
})


// @desc      Update goal
// @route     PUT /api/goals/:id
// @access    Private
const updateGoal = asyncHandler(async (req, res) => {
       const goal = await Goal.findById(req.params.id);

       if(!goal){
              res.status(400);
              throw new Error('Goal not found');
       }
       const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
              new: true
       })
       res.status(200).json({status: true, goal: updatedGoal});
})


// @desc      Delete goal
// @route     DELETE /api/goals/:id
// @access    Private
const deleteGoal = asyncHandler(async (req, res) => {
       const goal = await Goal.findById(req.params.id);
       if(!goal){
              res.status(400);
              throw new Error('Goal not found');
       }
       await Goal.findByIdAndDelete(req.params.id);
       // or
       // await goal.remove();
       res.status(200).json({message: `Delete Goal ${req.params.id}`})
})
module.exports = {
       getGoals,
       createGoal,
       updateGoal,
       deleteGoal
}