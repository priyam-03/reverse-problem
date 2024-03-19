const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/user");

const sendToken = require("../utils/jwtToken");

const mongoose = require("mongoose");

// Register a User
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, id } = req.body;

  const user = await User.create({
    id,
    name,
  });

  sendToken(user, 201, res);
});

// Login User
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { id, name } = req.body;

  // checking if user has given password and email both

  if (!id || !name) {
    return next(new ErrorHander("Please Enter id & name", 400));
  }

  const user = await User.findOne({ id });

  if (!user) {
    return next(new ErrorHander("Invalid id or name", 401));
  }

  sendToken(user, 200, res);
});

// Logout User
exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

// Get User Detail
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  sendToken(user, 200, res);
});

exports.getAllUser = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

// Get single user (admin)
exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHander(`User does not exist with Id: ${req.params.id}`)
    );
  }

  res.status(200).json({
    success: true,
    user,
  });
});
