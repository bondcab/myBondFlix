const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Schema for movies
let movieSchema = mongoose.Schema({
  Title: { type: String, required: true },
  Director: {
    Name: String,
    Bio: String,
    DOB: Date,
    DirectorImage: String,
  },
  Actor: {
    Name: String,
    Bio: String,
    DOB: Date,
    ActorImage: String,
  },
  Genre: [String],
  Description: { type: String, required: true },
  ImageURL: String,
});

// Schema for users
let userSchema = mongoose.Schema({
  Username: { type: String, required: true },
  FavouriteFilms: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
  DOB: Date,
  Email: { type: String, required: true },
  Password: { type: String, required: true },
});

userSchema.statics.hashPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};

userSchema.methods.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.Password);
};

let Movie = mongoose.model("Movie", movieSchema);
let User = mongoose.model("User", userSchema);

module.exports.Movie = Movie;
module.exports.User = User;
