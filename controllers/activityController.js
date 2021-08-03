const Activity = require('../models/activity');

getActivitiesByGymId = async (req, res) => {
  try {
    const activities = await Activity.find({ gymId: req.params.gymId })
    !activities.length ?
      res
        .status(402)
        .json({ success: false, error: "There are no activities to display for this gym" })
      :
      res
        .status(200)
        .json({ success: true, data: activities })
  }
  catch (err) {
    return res.status(400).json({ success: false, error: err, message: "Could not display activities" })
  }
}

getActivityById = async (req, res) => {
  try {
    const activity = await Activity.findOne({ _id: req.params.id })
    if (activity) {
      return res
      .status(200)
      .json({ success: true, data: activity })
  }
  else throw new Error("Activity not found")
  }
  catch (err) {
    return res.status(400).json({
      success: false,
      errorMessage: err.message,
      error: err,
      message: "Activity could not be displayed"
    })
  }
}

addActivity = async (req, res) => {
  try {
    const body = req.body
    if (body !== null) {
      const activity = new Activity(body)

      await activity.save()
      return res.status(201).json({
        success: true,
        id: activity._id,
        addedActivity: activity,
        message: 'Activity created!',
      })
    }
    else {
      throw new Error("You must provide activity information")
    }
  }
  catch (error) {
    return res.status(400).json({
      errorMessage: error.message,
      error,
      message: 'Activity could not be created!',
    })
  }
}

updateActivity = async (req, res) => {
  try {
    const body = req.body
    const activity = await Activity.findOne({ _id: req.params.id })
    if (body !== null) {
      Object.assign(activity, body)
      await activity.save()
      return res.status(200).json({
        success: true,
        id: activity._id,
        editedActivity: activity,
        message: 'Activity updated!',
      })
    }
    else {
      throw new Error("You must provide activity information")
    }
  }
  catch (error) {
    return res.status(404).json({
      errorMessage: error.message,
      error,
      message: 'Activity update did not succeed!',
    })
  }
}

deleteActivity = async (req, res) => {
  try {
    const activity = await Activity.findOneAndDelete({ _id: req.params.id })
    return res.status(200).json({ success: true, data: activity })
  }
  catch(err) {
    return res.status(404).json({
      errorMessage: error.message,
      error,
      message: 'Activity deletion did not succeed!',
    })
  }
}

module.exports = {
  getActivitiesByGymId,
  getActivityById,
  addActivity,
  updateActivity,
  deleteActivity
}