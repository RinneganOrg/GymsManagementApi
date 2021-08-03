const express = require('express');
const router = express.Router();

let course_controller = require('../controllers/courseController');
let trainer_controller = require('../controllers/trainerController');
let comment_controller = require('../controllers/commentController');

router.get('/:id', course_controller.getCourseById);
router.post('', course_controller.addCourse);
router.put('/:id', course_controller.updateCourse);
router.get('/:courseId/trainers', trainer_controller.getTrainersByCourseId);
router.get('/:courseId/comments', comment_controller.getCommentsByCourseId);


module.exports = router;
