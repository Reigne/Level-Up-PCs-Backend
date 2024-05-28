const User = require("../models/user");
const ErrorHandler = require("../utils/errorHandler");
const crypto = require("crypto");
const sendToken = require("../utils/jwtToken");
const cloudinary = require("cloudinary").v2;

exports.registerUser = async (req, res, next) => {
  const { fullname, email, password, confirmPassword } = req.body;

  // Check if password and confirmPassword match
  if (password !== confirmPassword) {
    return next(
      new ErrorHandler("Password and Confirm Password do not match", 401)
    );
  }

  try {
    // Check if the email already exists in the database
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return next(new ErrorHandler("Email already exists", 409));
    }

    // Create a new user if the email doesn't already exist
    const user = await User.create({
      fullname,
      email,
      password,
    });

    // Send response with token
    sendToken(user, 200, res);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};
