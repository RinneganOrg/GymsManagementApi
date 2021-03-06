const User = require('../models/user');
let jwt = require("jsonwebtoken");
const config = require("../config/authConfig");
let bcrypt = require("bcryptjs");

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

signup = async (req, res) => {
  try {
    const body = req.body
    if (body !== null) {
      const user = await User.findOne({ email: req.body.email })
      if (user) {
        return res.status(400).json({
          success: false,
          message: 'There is already an account with this email address!',
        })
      }
      else {
        if (req.body.password === req.body.repeatPassword) {
          const userToAdd = new User({
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
            role: req.body.role
          })
          await userToAdd.save()
          var token = jwt.sign({ id: userToAdd._id }, config.secret, {
            expiresIn: 86400
          });
          return res.status(201).json({
            success: true,
            accessToken: token,
            user: {
              _id: userToAdd.id,
              email: userToAdd.email,
              role: userToAdd.role
            },
            message: "User created"
          })
        }
        else {
          return res.status(400).json({
            success: false,
            message: 'The passwords do not match',
          })
        }
      }
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

signin = async (req, res) => {
  try {
    const body = req.body
    if (body !== null) {
      const user = await User.findOne({ email: req.body.email })
      if (user) {
        let isValidPassword = bcrypt.compareSync(
          req.body.password,
          user.password
        );

        if (!isValidPassword) {
          return res.status(400).json({
            success: false,
            message: 'Email and password combo did not match any existent user!',
          })
        } else {
          let token = jwt.sign({ id: user._id }, config.secret, {
            expiresIn: 86400
          });
          // let cookievalue = await bcrypt.hash(token, 10)
          res.cookie("token", token)
          return res.status(200).json({
            success: true,
            accessToken: token,
            user: {
              _id: user.id,
              email: user.email,
              role: user.role
            },
            message: 'User logged in',
          })
        }
      }
      else {
        res.status(400).json({
          success: false,
          message: 'Email and password combo did not match any existent user!',
        })
      }
    }
    else {
      throw new Error("You must provide user information")
    }
  }
  catch (error) {
    return res.status(400).json({
      errorMessage: error.message,
      error,
      message: 'User could not log in!',
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
  signup,
  signin,
  updateUser
}