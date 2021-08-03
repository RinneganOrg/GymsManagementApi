const express = require('express');
const router = express.Router();

let user_controller = require('../controllers/userController');

router.get('', user_controller.getUsers);
router.get('/:id', user_controller.getUserById);
router.post('', user_controller.addUser);
router.put('/:id', user_controller.updateUser);


module.exports = router;
