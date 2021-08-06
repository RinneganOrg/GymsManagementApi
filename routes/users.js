const express = require('express');
const router = express.Router();

let user_controller = require('../controllers/userController');

router.get('', user_controller.getUsers);
router.get('/:id', user_controller.getUserById);
router.post('/signup', user_controller.signup);
router.post('/signin', user_controller.signin);
router.put('/:id', user_controller.updateUser);


module.exports = router;
