const express = require('express');
const router = express.Router();

let trainer_controller = require('../controllers/trainerController');
let comment_controller = require('../controllers/commentController');

router.get('', trainer_controller.getTrainers);
router.get('/:id', trainer_controller.getTrainerById);
router.post('', trainer_controller.addTrainer);
router.get('/:trainerId/comments', comment_controller.getCommentsByTrainerId);
router.put('/:id', trainer_controller.updateTrainer);


module.exports = router;
