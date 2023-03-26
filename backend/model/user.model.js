const mongoose = require("mongoose");

//user schema
const userSchema = mongoose.Schema(
  {
    email: String,
    password: String,
    city: String,
    age: Number,
  },
  {
    versionKey: false,
  }
);

const UserModel = mongoose.model("user", userSchema);

module.exports = {
  UserModel,
};
