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
});

const ReveiwModel = mongoose.model("Review", ReveiwSchemaa);
module.exports = ReveiwModel;
