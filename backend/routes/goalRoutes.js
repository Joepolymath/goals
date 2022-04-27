const express = require('express');
const {getGoals, createGoal, updateGoal, deleteGoal} = require('../controllers/goalController');

const router = express.Router();

router.get('/', getGoals);

router.post('/', createGoal);

router.put('/:id', updateGoal);

router.delete('/:id', deleteGoal);

// since the get and post have same endpoint, we can say:
// router.route('/').get(getGoals).post(createGoal);

// since the put and delete have same endpoint, we can say:
// router.route('/:id').put(updateGoal).delete(deleteGoal);

module.exports = router;