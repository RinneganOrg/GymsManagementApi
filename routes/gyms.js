const express = require('express');
const router = express.Router();

let gym_controller = require('../controllers/gymController');
let trainer_controller = require('../controllers/trainerController');
let course_controller = require('../controllers/courseController');
let activity_controller = require('../controllers/activityController');
let comment_controller = require('../controllers/commentController');

router.get('', gym_controller.getGyms);
router.get('/:id', gym_controller.getGymById);
router.post('', gym_controller.addGym);
router.put('/:id', gym_controller.updateGym);
router.get('/:gymId/trainers', trainer_controller.getTrainersByGymId);
router.get('/:gymId/courses', course_controller.getCoursesByGymId);
router.get('/:gymId/activities', activity_controller.getActivitiesByGymId);
router.get('/:gymId/comments', comment_controller.getCommentsByGymId);


module.exports = router;
