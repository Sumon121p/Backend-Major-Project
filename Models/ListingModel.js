const mongoose = require("mongoose");

const ListingScema = mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    set: (v) =>
      v === ""
        ? "https://unsplash.com/photos/calm-body-of-water-during-sunset-3eC5n6gHwe8"
        : v,
  },
  price: {
    type: Number,
    require: true,
  },
  location: {
    type: String,
    require: true,
  },
  country: {
    type: String,
    require: true,
  },
});

const Listing = mongoose.model("Listing", ListingScema);
module.exports = Listing;
