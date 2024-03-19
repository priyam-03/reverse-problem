const mongoose = require("mongoose");

const jwt = require("jsonwebtoken");

const { Schema } = mongoose;
const userSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: [true, "Please Enter Your id"],
      unique: true,
    },
    name: {
      type: String,
      required: [true, "Please Enter group name"],
    },
  },
  { timestamps: true }
);

// JWT TOKEN
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

module.exports = mongoose.model("Userauth", userSchema);
