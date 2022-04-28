const express = require('express');
const {registerUser, getMe, loginUser} = require('../controllers/userController');
const {protect} = require('../middlewares/authMiddleware');
const router = express.Router();


router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/me',protect, getMe)

module.exports = router;