const express = require('express');
const {getGoals, createGoal, updateGoal, deleteGoal} = require('../controllers/goalController');
const {protect} = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', protect, getGoals);

router.post('/', protect, createGoal);

router.put('/:id', protect, updateGoal);

router.delete('/:id', protect, deleteGoal);

// since the get and post have same endpoint, we can say:
// router.route('/').get(getGoals).post(createGoal);

// since the put and delete have same endpoint, we can say:
// router.route('/:id').put(updateGoal).delete(deleteGoal);

module.exports = router;