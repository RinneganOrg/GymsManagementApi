const express = require('express');
const router = express.Router();

let course_controller = require('../controllers/courseController');
let comment_controller = require('../controllers/commentController');
let trainer_controller = require('../controllers/trainerController');

router.get('/:id', course_controller.getCourseById);
router.post('', course_controller.addCourse);
router.get('', course_controller.getCourses);
router.put('/:id', course_controller.updateCourse);
router.get('/:courseId/comments', comment_controller.getCommentsByCourseId);
router.get('/:courseId/trainers', trainer_controller.getTrainersByCourseId);


module.exports = router;
