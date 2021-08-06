const Gym = require('../models/gym');

getGyms = async (req, res) => {
  try {
    const gyms = await Gym.find({})
    !gyms.length ?
      res
        .status(402)
        .json({ success: false, error: "There are no gyms to display" })
      :
      res
        .status(200)
        .json({ success: true, data: gyms })
  }
  catch (err) {
    return res.status(400).json({ success: false, error: err, message: "Could not display gyms" })
  }
}

getGymById = async (req, res) => {
  try {
    const gym = await Gym.findOne({ _id: req.params.id })
    if (gym) {
      return res
        .status(200)
        .json({ success: true, data: gym })
    }
    else throw new Error("Gym not found")
  }
  catch (err) {
    return res.status(400).json({ 
      success: false,
      errorMessage: err.message,
      error: err,
      message: "Gym could not be displayed"
    })
  }
}

addGym = async (req, res) => {
  try {
    const body = req.body
    if (body !== null) {
      const gym = new Gym(body)

      await gym.save()
      return res.status(201).json({
        success: true,
        id: gym._id,
        addedGym: gym,
        message: 'Gym created!',
      })
    }
    else {
      throw new Error("You must provide gym information")
    }
  }
  catch (error) {
    return res.status(400).json({
      errorMessage: error.message,
      error,
      message: 'Gym could not be created!',
    })
  }
}

updateGym = async (req, res) => {
  try {
    const body = req.body
    const gym = await Gym.findOne({ _id: req.params.id })
    if (body !== null) {
      Object.assign(gym, body)
      await gym.save()
      return res.status(200).json({
        success: true,
        id: gym._id,
        editedGym: gym,
        message: 'Gym updated!',
      })
    }
    else {
      throw new Error("You must provide gym information")
    }
  }
  catch (error) {
    return res.status(404).json({
      errorMessage: error.message,
      error,
      message: 'Gym update did not succeed!',
    })
  }
}

module.exports = {
  getGyms,
  getGymById,
  addGym,
  updateGym
}