const express = require('express');
const router = express.Router();

let activity_controller = require('../controllers/activityController');

router.get('/:id', activity_controller.getActivityById);
router.post('', activity_controller.addActivity);
router.put('/:id', activity_controller.updateActivity);
router.delete('/:id', activity_controller.deleteActivity);


module.exports = router;
