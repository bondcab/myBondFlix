
//adding packages
const express = require('express'),
    morgan = require('morgan'),
    fs = require('fs'),
    uuid = require('uuid'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    Models = require('./models.js'),
    path = require('path');


//running the express package put in variable called app
const app = express();
// 2.8 - Models from models.js
const Movies = Models.Movie;
const Users = Models.User;

// 2.8 - Code to connect Mongoose to bondFilmDB in MongoDB
mongoose.connect('mongodb://localhost:27017/bondFilmDB', { useNewUrlParser: true, useUnifiedTopology: true });

//Appends the log.txt file 
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), { flags: 'a' })


//Middleware functions must be used
app.use(morgan('combined', { stream: accessLogStream }));

// 2.9 - auth.js 
let auth = require('./auth')(app);

//2.9 - Passport module
const passport = require('passport');
require('./passport');

//For when accessing the body of a request using req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




//GET Requests on movies
// 2.8 - Returns all movies
app.get('/movies', passport.authenticate('jwt', { session: false }), async (req, res) => {
    await Movies.find()
        .then((movie) => {
            res.status(201).json(movie);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});


// 2.8 - Returns data about a single film by title
app.get("/movies/:Title", (req, res) => {
    Movies.findOne({ Title: req.params.Title })
        .then((movie) => {
            res.json(movie);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send("Error: " + err);
        });
});

// 2.8 - Get data about Director by directos name
app.get("/movies/director/:Director", (req, res) => {
    Movies.findOne({ 'Director.Name': req.params.Director })
        .then((movie) => {
            if (movie) {
                res.json(movie.Director);
            }

        })
        .catch((err) => {
            console.error(err);
            res.status(500).send("Error: " + err);
        });
});

//returns message below when homepage is accessed
app.get('/', (req, res) => {
    res.send('The names Bond, James Bond')
})




//Users

// 2.8 - Adds new user users collection in MongoDB 
app.post('/users', async (req, res) => {
    console.log(req.body);


    await Users.findOne({ Username: req.body.Username })
        .then((user) => {
            if (user) {
                return res.status(400).send(req.body.Username + ' already exists');
            } else {
                Users
                    .create({
                        Username: req.body.Username,
                        Password: req.body.Password,
                        Email: req.body.Email,
                        DOB: req.body.DOB
                    })
                    .then((user) => { res.status(201).json(user) })
                    .catch((error) => {
                        console.error(error);
                        res.status(500).send('Error: ' + error);
                    })
            }
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
        });
});


// 2.8 - Add a movie to users favourites
app.post('/users/:Username/movies/:MovieID', async (req, res) => {
    await Users.findOneAndUpdate({ Username: req.params.Username }, {
        $push: { FavouriteFilms: req.params.MovieID }
    },
        { new: true })
        .then((updatedUser) => {
            res.json(updatedUser);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});


// 2.8 - Delete a movie to users favourites
app.delete('/users/:Username/movies/:MovieID', async (req, res) => {
    await Users.findOneAndUpdate({ Username: req.params.Username }, {
        $pull: { FavouriteFilms: req.params.MovieID }
    },
        { new: true })
        .then((updatedUser) => {
            res.json(updatedUser);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});





//returns documentation html page 
app.get('/documentation', (req, res) => {
    res.sendFile('documentation.html', { root: __dirname + '/public' });
});


//Automatically routes request for static files in the public folder
app.use(express.static('public'));


//listen for requests on port 8080
app.listen(8080, () => {
    console.log('App is listening on port 8080')
});

//error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something not working!')
})



// 2.8 - Get all users
app.get('/users', async (req, res) => {
    await Users.find()
        .then((users) => {
            res.status(201).json(users);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});


// 2.8 - Get users by username
app.get('/users/:Username', async (req, res) => {
    await Users.findOne({ Username: req.params.Username })
        .then((users) => {
            res.status(201).json(users);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});


// 2.8 - Update users info by username
app.put('/users/:Username', passport.authenticate('jwt', { session: false }), async (req, res) => {
    if (req.user.Username !== req.params.Username) {
        return res.status(400).send('Permission denied');
    }


    await Users.findOneAndUpdate({ Username: req.params.Username }, {
        $set:
        {
            Username: req.body.Username,
            Password: req.body.Password,
            Email: req.body.Email,
            DOB: req.body.DOB
        }
    },
        { new: true })
        .then((updatedUser) => {
            res.json(updatedUser);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err)
        })
});



// 2.8 - Delete a user by username
app.delete('/users/:Username', async (req, res) => {
    await Users.findOneAndRemove({ Username: req.params.Username })
        .then((user) => {
            if (!user) {
                res.status(400).send(req.params.Username + ' was not found');
            } else {
                res.status(200).send(req.params.Username + ' was deleted')
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err)
        });
});





