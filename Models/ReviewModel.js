const mongoose = require("mongoose");

const ReveiwSchemaa = new mongoose.Schema({
  Comment: {
    type: String,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  }
});

const ReveiwModel = mongoose.model("Review", ReveiwSchemaa);
module.exports = ReveiwModel;