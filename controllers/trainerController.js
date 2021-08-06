const Trainer = require('../models/trainer');
const Course = require('../models/course');

getTrainers = async (req, res) => {
  try {
    const trainers = await Trainer.find({})
    !trainers.length ?
      res
        .status(402)
        .json({ success: false, error: "There are no trainers to display" })
      :
      res
        .status(200)
        .json({ success: true, data: trainers })
  }
  catch (err) {
    return res.status(400).json({ success: false, error: err, message: "Could not display trainers" })
  }
}

getTrainersByGymId = async (req, res) => {
  try {
    const trainers = await Trainer.find({ gymId: req.params.gymId })
    !trainers.length ?
      res
        .status(402)
        .json({ success: false, error: "There are no trainers to display for this gym" })
      :
      res.status(200).json({ success: true, data: trainers })
  }
  catch (err) {
    return res.status(400).json({ success: false, error: err, message: "Could not display trainers of this gym" })
  }
}

getTrainersByCourseId = async (req, res) => {
  try {
    const course = await Course.findOne({ _id: req.params.courseId })
    const trainers = course.trainersId.map(trainerId => Trainer.findOne({ _id: trainerId }))
    Promise
      .all(trainers)
      .then((trainer) => { res.status(200).json({ success: true, data: trainer }) })
  }
  catch (err) {
    return res.status(400).json({ success: false, error: err, message: "Could not display trainers of this course" })
  }
}

getTrainerById = async (req, res) => {
  try {
    const trainer = await Trainer.findOne({ _id: req.params.id })
    if (trainer) {
      return res
        .status(200)
        .json({ success: true, data: trainer })
    }
    else throw new Error("Trainer not found")
  }
  catch (err) {
    return res.status(400).json({
      success: false,
      errorMessage: err.message,
      error: err,
      message: "Trainer could not be displayed"
    })
  }
}

addTrainer = async (req, res) => {
  try {
    const body = req.body

    if (body !== null) {
      const trainer = new Trainer(body)

      await trainer.save()
      return res.status(201).json({
        success: true,
        id: trainer._id,
        addedTrainer: trainer,
        message: 'Trainer created!',
      })
    }
    else {
      throw new Error("You must provide trainer information")
    }
  }
  catch (error) {
    return res.status(400).json({
      errorMessage: error.message,
      error,
      message: 'Trainer could not be created!'
    })
  }
}

updateTrainer = async (req, res) => {
  try {
    const body = req.body
    const trainer = await Trainer.findOne({ _id: req.params.id })
    if (body !== null) {
      Object.assign(trainer, body)
      await trainer.save()
      return res.status(200).json({
        success: true,
        id: trainer._id,
        editedTrainer: trainer,
        message: 'Trainer updated!',
      })
    }
    else {
      throw new Error("You must provide trainer information")
    }
  }
  catch (error) {
    return res.status(404).json({
      errorMessage: error.message,
      error,
      message: 'Trainer update did not succeed!',
    })
  }
}

module.exports = {
  getTrainers,
  getTrainerById,
  getTrainersByGymId,
  getTrainersByCourseId,
  addTrainer,
  updateTrainer
}