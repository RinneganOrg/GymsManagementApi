const express = require('express');
const router = express.Router();

let comment_controller = require('../controllers/commentController');

router.get('/:id', comment_controller.getCommentById);
router.post('', comment_controller.addComment);
router.put('/:id', comment_controller.updateComment);
router.delete('/:id', comment_controller.deleteComment);


module.exports = router;
