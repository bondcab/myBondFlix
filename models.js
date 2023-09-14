const mongoose = require('mongoose');

//Schema for movies
let movieSchema = mongoose.Schema({
    Title: { type: String, required: true },
    Director: {
        Name: String,
        Bio: String,
        DOB: Date
    },
    Actor: {
        Name: String,
        Bio: String,
        DOB: Date
    },
    Genre: [String],
    Description: { type: String, required: true },
    ImageURL: String
})


//Schema for users
let userSchema = mongoose.Schema({
    Username: { type: String, required: true },
    FavouriteFilms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
    DOB: Date,
    Email: { type: String, required: true },
    Password: { type: String, required: true }
})


let Movie = mongoose.model('Movie', movieSchema);
let User = mongoose.model('User', userSchema);


module.exports.Movie = Movie;
module.exports.User = User;


