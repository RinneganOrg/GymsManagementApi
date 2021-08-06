const Comment = require('../models/comment');

getComments = async (req, res) => {
  try {
    const comments = await Comment.find({})
    !comments.length ?
      res
        .status(402)
        .json({ success: false, message: "There are no comments to display" })
      :
      res
        .status(200)
        .json({ success: true, data: comments })
  }
  catch (err) {
    return res.status(400).json({ success: false, error: err, message: "Could not display comments" })
  }
}

getCommentsByGymId = async (req, res) => {
  try {
    const comments = await Comment.find({ gymId: req.params.gymId })
    !comments.length ?
      res
        .status(402)
        .json({ success: false, error: "There are no comments to display for this gym" })
      :
      res
        .status(200)
        .json({ success: true, data: comments })
  }
  catch (err) {
    return res.status(400).json({ success: false, error: err, message: "Could not display comments for this gym" })
  }
}

getCommentsByTrainerId = async (req, res) => {
  try {
    const comments = await Comment.find({ trainerId: req.params.trainerId })
    !comments.length ?
      res
        .status(402)
        .json({ success: false, error: "There are no comments to display for this trainer" })
      :
      res
        .status(200)
        .json({ success: true, data: comments })
  }
  catch (err) {
    return res.status(400).json({ success: false, error: err, message: "Could not display comments for this trainer" })
  }
}

getCommentsByCourseId = async (req, res) => {
  try {
    const comments = await Comment.find({ courseId: req.params.courseId })
    !comments.length ?
      res
        .status(402)
        .json({ success: false, error: "There are no comments to display for this course" })
      :
      res
        .status(200)
        .json({ success: true, data: comments })
  }
  catch (err) {
    return res.status(400).json({ success: false, error: err, message: "Could not display comments for this course" })
  }
}

getCommentById = async (req, res) => {
  try {
    const comment = await Comment.findOne({ _id: req.params.id })
    if (comment) {
      return res
      .status(200)
      .json({ success: true, data: comment })
  }
  else throw new Error("Comment not found")
  }
  catch (err) {
    return res.status(400).json({
      success: false,
      errorMessage: err.message,
      error: err,
      message: "Comment could not be displayed"
    })
  }
}

addComment = async (req, res) => {
  try {
    const body = req.body
    if (body !== null) {
      const comment = new Comment(body)

      await comment.save()
      return res.status(201).json({
        success: true,
        id: comment._id,
        addedComment: comment,
        message: 'Comment created!',
      })
    }
    else {
      throw new Error("You must provide comment information")
    }
  }
  catch (error) {
    return res.status(400).json({
      errorMessage: error.message,
      error,
      message: 'Comment could not be created!',
    })
  }
}

updateComment = async (req, res) => {
  try {
    const body = req.body
    const comment = await Comment.findOne({ _id: req.params.id })
    if (body !== null) {
      Object.assign(comment, body)
      await comment.save()
      return res.status(200).json({
        success: true,
        id: comment._id,
        editedComment: comment,
        message: 'Comment updated!',
      })
    }
    else {
      throw new Error("You must provide comment information")
    }
  }
  catch (error) {
    return res.status(404).json({
      errorMessage: error.message,
      error,
      message: 'Comment update did not succeed!',
    })
  }
}

deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findOneAndDelete({ _id: req.params.id })
    return res.status(200).json({ success: true, data: comment })
  }
  catch(err) {
    return res.status(404).json({
      errorMessage: error.message,
      error,
      message: 'Comment deletion did not succeed!',
    })
  }
}
module.exports = {
  getComments,
  getCommentsByGymId,
  getCommentsByTrainerId,
  getCommentsByCourseId,
  getCommentById,
  addComment,
  updateComment,
  deleteComment
}