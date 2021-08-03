const Course = require('../models/course');

getCoursesByGymId = async (req, res) => {
  try {
    const courses = await Course.find({ gymId: req.params.gymId })
    !courses.length ?
      res
        .status(402)
        .json({ success: false, error: "There are no courses to display for this gym" })
      :
      res
        .status(200)
        .json({ success: true, data: courses })
  }
  catch (err) {
    return res.status(400).json({ success: false, error: err, message: "Could not display courses" })
  }
}

getCourseById = async (req, res) => {
  try {
    const course = await Course.findOne({ _id: req.params.id })
    if (course) {
      return res
        .status(200)
        .json({ success: true, data: course })
    }
    else throw new Error("Course not found")
  }
  catch (err) {
    return res.status(400).json({
      success: false,
      errorMessage: err.message,
      error: err,
      message: "Course could not be displayed"
    })
  }
}

addCourse = async (req, res) => {
  try {
    const body = req.body

    if (body !== null) {
      const course = new Course(body)

      await course.save()
      return res.status(201).json({
        success: true,
        id: course._id,
        addedCourse: course,
        message: 'Course created!',
      })
    }
    else {
      throw new Error("You must provide course information")
    }
  }
  catch (error) {
    return res.status(400).json({
      errorMessage: error.message,
      error,
      message: 'Course could not be created!'
    })
  }
}

updateCourse = async (req, res) => {
  try {
    const body = req.body
    const course = await Course.findOne({ _id: req.params.id })
    if (body !== null) {
      Object.assign(course, body)
      await course.save()
      return res.status(200).json({
        success: true,
        id: course._id,
        editedCourse: course,
        message: 'Course updated!',
      })
    }
    else {
      throw new Error("You must provide course information")
    }
  }
  catch (error) {
    return res.status(404).json({
      errorMessage: error.message,
      error,
      message: 'Course update did not succeed!',
    })
  }
}

module.exports = {
  getCoursesByGymId,
  getCourseById,
  addCourse,
  updateCourse
}