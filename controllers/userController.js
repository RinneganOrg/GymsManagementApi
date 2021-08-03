const User = require('../models/user');

getUsers = async (req, res) => {
  try {
    const users = await User.find({})
    !users.length ?
      res
        .status(402)
        .json({ success: false, error: "There are no users to display" })
      :
      res
        .status(200)
        .json({ success: true, data: users })
  }
  catch (err) {
    return res.status(400).json({ success: false, error: err, message: "Could not display users" })
  }
}

getUserById = async (req, res) => {
  try {
      const user = await User.findOne({ _id: req.params.id })
      if (user) {
        return res
          .status(200)
          .json({ success: true, data: user })
      }
      else throw new Error("User not found")
  }
  catch (err) {
    return res.status(400).json({
      success: false,
      errorMessage: err.message,
      error: err,
      message: "User could not be displayed"
    })
  }
}

addUser = async (req, res) => {
  try {
    const body = req.body
    if (body !== null) {
      const user = new User(body)

      await user.save()
      return res.status(201).json({
        success: true,
        id: user._id,
        addedUser: user,
        message: 'User created!',
      })
    }
    else {
      throw new Error("You must provide user information")
    }
  }
  catch (error) {
    return res.status(400).json({
      errorMessage: error.message,
      error,
      message: 'User could not be created!',
    })
  }
}


updateUser = async (req, res) => {
  try {
    const body = req.body
    const user = await User.findOne({ _id: req.params.id })
    if (body !== null) {
      Object.assign(user, body)
      await user.save()
      return res.status(200).json({
        success: true,
        id: user._id,
        editedUser: user,
        message: 'User updated!',
      })
    }
    else {
      throw new Error("You must provide user information")
    }
  }
  catch (error) {
    return res.status(404).json({
      errorMessage: error.message,
      error,
      message: 'User update did not succeed!',
    })
  }
}

module.exports = {
  getUsers,
  getUserById,
  addUser,
  updateUser
}