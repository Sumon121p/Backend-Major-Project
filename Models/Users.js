const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const User = new mongoose.Schema({
  email: {
    type: String,
    require: true,
  },
});

User.plugin(passportLocalMongoose); 

const UserModel = mongoose.model("User", User);
module.exports = UserModel;