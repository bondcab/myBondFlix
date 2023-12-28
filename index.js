// Imported packages
const express = require("express"),
  morgan = require("morgan"),
  fs = require("fs"),
  uuid = require("uuid"),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  Models = require("./models.js"),
  cors = require("cors"),
  bcrypt = require("bcryptjs"),
  path = require("path");

// Express validator to ensure data coming in is safe
const { check, validationResult } = require("express-validator");

// Adding port number to variable
const port = process.env.PORT || 8080;

// Running the express package put in variable called app
const app = express();

// Models from models.js
const Movies = Models.Movie;
const Users = Models.User;

// Connection to online database
mongoose.connect(process.env.CONNECTION_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Appends the log.txt file
const accessLogStream = fs.createWriteStream(path.join(__dirname, "log.txt"), {
  flags: "a",
});

// Middleware functions must be used
app.use(morgan("combined", { stream: accessLogStream }));

// Cross-Origin Resource Sharing module express will use
let allowedOrigins = [
  "http://localhost:8080",
  "http://localhost:1234",
  "https://mybond-flix.netlify.app",
  "http://localhost:4200",
  "https://bondcab.github.io",
];

// Tells Express to use cors middelware to check requested origin is permitted
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        let message =
          "The CORS policy for this application doesn't allow access from origin " +
          origin;
        return callback(new Error(message), false);
      }
      return callback(null, true);
    },
  })
);

// Passport module
const passport = require("passport");
require("./passport");

// For when accessing the body of a request using req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// auth.js
let auth = require("./auth")(app);

/**
 * @description Get all movies
 * @name GET /movies
 * @example
 * Authentication: Bearer token (JWT)
 * @example
 * Request data format
 * none
 * @example
 * Response data format
 * [
 *   {
 *     _id: ObjectID
 *     "Title": "",
 *     "Description": "",
 *     "Genre": ObjectID,
 *     "Director": [ObjectID],
 *     "Actors": [ObjectID],
 *     "ImagePath": "",
 *
 *   }
 * ]
 */
app.get(
  "/movies",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    // Fetch all movies from the MongoDB collection
    await Movies.find()
      .then((movie) => {
        // Respond with a JSON object containing the list of movies
        res.status(201).json(movie);
      })
      .catch((err) => {
        // Handle errors, log them, and send an error response
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

/**
 * @description Get movie information
 * @name GET /movies[title]
 * @example
 * Authentication: Bearer token (JWT)
 * @example
 * Request data format
 * none
 * @example
 * Response data format
 * [
 *   {
 *     _id: ObjectID('64f88e728b23c0576f5ec9c6')
 *     "Title": "Casino Royale",
 *     "Description": "James Bond's first mission as a 00 agent leads him to a high-stakes poker game at Casino Royale where he faces off against a dangerous terrorist financier",
 *     "Director": "Martin Campbell",
 *     "Actor": "Daniel Craig",
 *     "ImageURL": "https://www.slashfilm.com/img/gallery/why-casino-royale-is-the-best-james-bond-movie/l-intro-1633615873.jpg",
 *
 *   }
 * ]
 */
app.get(
  "/movies/:Title",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Movies.findOne({ Title: req.params.Title })
      .then((movie) => {
        res.json(movie);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

/**
 * @description Get director information
 * @name GET /movies/director/[director name]
 * @example
 * Authentication: Bearer token (JWT)
 * @example
 * Request data format
 * none
 * @example
 * Response data format
 * [
 *   {
 *     "Name": "Martin Campbell",
 *     "Bio": "Martin Campbell is a New Zealand film and television director and producer. He was born on October 24, 1943, in Hastings, New Zealand. Campbell is known for his work on action-packed films and successful franchise reboots. He directed two James Bond films: 'GoldenEye' and 'Casino Royale.' 'Casino Royale' marked the beginning of the Daniel Craig era as James Bond and received critical acclaim for its gritty and realistic take on the character. Campbell's contribution to revitalizing the Bond franchise is widely recognized.",
 *     "Date Of Birth": "October 24, 1943",
 *     "DirectorImage": "https://m.media-amazon.com/images/M/MV5BMTM3MzI4MTY3NF5BMl5BanBnXkFtZTcwODM1OTg0NQ@@._V1_.jpg",
 *
 *   }
 * ]
 */
app.get(
  "/movies/director/:Director",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Find a movie in the MongoDB collection with the specified title
    Movies.findOne({ "Director.Name": req.params.Director })
      .then((movie) => {
        // Respond with a JSON object containing the movie details
        if (movie) {
          res.json(movie.Director);
        }
      })
      .catch((err) => {
        // Handle errors, log them, and send an error response
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

// Returns message below when homepage is accessed
app.get("/", (req, res) => {
  res.send("The names Bond, James Bond");
});

// User endpoints

/**
 * @description Register user
 * @name POST /users
 * @example
 * Request data format
 * [
 *   {
 *     "Username": "Tom Smith",
 *     "Password": "Chocolate22!",
 *     "Email": "tom.smith@outlook.com",
 *     "DOB": "01/03/1994",
 *
 *   }
 * ]
 * @example
 * Response data format
 * [
 *   {
 *     "Username": "Tom Smith",
 *     "Password": "Chocolate22!",
 *     "Email": "tom.smith@outlook.com",
 *     "DOB": "01/03/1994",
 *
 *   }
 * ]
 */
app.post(
  "/users",
  [
    check("Username", "Username is required").isLength({ min: 5 }),
    check(
      "Username",
      "Username contains non alpanumeric characters - not allowed."
    ).isAlphanumeric(),
    check("Password", "Password is required").not().isEmpty(),
    check("Email", "Email does not appear to be valid").isEmail(),
  ],
  async (req, res) => {
    // Checks for validation errors
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      // Respond with validation errors if they exist
      return res.status(422).json({ errors: errors.array() });
    }

    console.log(req.body);
    // Hashes users password before adding to MongoDB
    let hashedPassword = Users.hashPassword(req.body.Password);

    await Users.findOne({ Username: req.body.Username })
      .then((user) => {
        // Respond with an error if the username already exists
        if (user) {
          return res.status(400).send(req.body.Username + " already exists");
        } else {
          Users.create({
            // Create a new user in the MongoDB collection
            Username: req.body.Username,
            Password: hashedPassword,
            Email: req.body.Email,
            DOB: req.body.DOB,
          })
            .then((user) => {
              // Respond with a JSON object containing the new user details
              res.status(201).json(user);
            })
            .catch((error) => {
              // Handle errors, log them, and send an error response
              console.error(error);
              res.status(500).send("Error: " + error);
            });
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("Error: " + error);
      });
  }
);

/**
 * @description Update user info
 * @name PUT /users
 * @example
 * Authentication: Bearer token (JWT)
 * @example
 * Request data format
 * [
 *   {
 *     "Username": "Tom Smith",
 *     "Password": "Chocolate22!",
 *     "Email": "tom.smith@outlook.com",
 *     "DOB": "01/03/1994",
 *
 *   }
 * ]
 * @example
 * Response data format
 * [
 *   {
 *     "_id": "65034384a926abd2124b0655",
 *     "Username": "Tom Smith",
 *     "FavouriteFilms": [],
 *     "Password": "Chocolate22!",
 *     "Email": "tom.smith@outlook.com",
 *     "DOB": "01/03/1994",
 *
 *   }
 * ]
 */
app.put(
  "/users/:Username",
  [
    check("Username", "Username is required").isLength({ min: 5 }),
    check(
      "Username",
      "Username contains non alpanumeric characters - not allowed."
    ).isAlphanumeric(),
    check("Password", "Password is required").not().isEmpty(),
    check("Email", "Email does not appear to be valid").isEmail(),
  ],

  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    if (req.user.Username !== req.params.Username) {
      return res.status(400).send("Permission denied");
    }

    await Users.findOneAndUpdate(
      { Username: req.params.Username },
      {
        $set: {
          Username: req.body.Username,
          Password: req.body.Password,
          Email: req.body.Email,
          DOB: req.body.DOB,
        },
      },
      { new: true }
    )
      .then((updatedUser) => {
        res.json(updatedUser);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

/**
 * @description Add movie to users favourites
 * @name POST /users/[username]/movies/[id]
 * @example
 * Authentication: Bearer token (JWT)
 * @example
 * Request data format
 * none
 * @example
 * Response data format
 * [
 *   {
 *     "_id": "65034384a926abd2124b0655",
 *     "Username": "Tom Smith",
 *     "FavouriteFilms": [64f897d28b23c0576f5ec9d3],
 *     "Password": "Chocolate22!",
 *     "Email": "tom.smith@outlook.com",
 *     "DOB": "01/03/1994",
 *
 *   }
 * ]
 */
app.post(
  "/users/:Username/movies/:MovieID",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    // Check if the authenticated user has permission to add a movie to their favorites
    if (req.user.Username !== req.params.Username) {
      return res.status(400).send("Permission denied");
    }

    await Users.findOneAndUpdate(
      // Find the user and update their list of favorite films in the MongoDB collection
      { Username: req.params.Username },
      {
        $push: { FavouriteFilms: req.params.MovieID },
      },
      { new: true }
    )
      .then((updatedUser) => {
        // Respond with a JSON object containing the updated user details
        res.json(updatedUser);
      })
      .catch((err) => {
        // Handle errors, log them, and send an error response
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

/**
 * @description Deletes movie from users favourites
 * @name DELETE /users/[username]/movies/[id]
 * @example
 * Authentication: Bearer token (JWT)
 * @example
 * Request data format
 * none
 * @example
 * Response data format
 * [
 *   {
 *     "_id": "65034384a926abd2124b0655",
 *     "Username": "Tom Smith",
 *     "FavouriteFilms": [],
 *     "Password": "Chocolate22!",
 *     "Email": "tom.smith@outlook.com",
 *     "DOB": "01/03/1994",
 *
 *   }
 * ]
 */
app.delete(
  "/users/:Username/movies/:MovieID",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    // Check if the authenticated user has permission to delete a movie from their favorites
    if (req.user.Username !== req.params.Username) {
      return res.status(400).send("Permission denied");
    }

    await Users.findOneAndUpdate(
      // Find the user and update their list of favorite films in the MongoDB collection to remove the specified movie
      { Username: req.params.Username },
      {
        $pull: { FavouriteFilms: req.params.MovieID },
      },
      { new: true }
    )
      .then((updatedUser) => {
        // Respond with a JSON object containing the updated user details
        res.json(updatedUser);
      })
      .catch((err) => {
        // Handle errors, log them, and send an error response
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

// Returns documentation html page
app.get("/documentation", (req, res) => {
  res.sendFile("documentation.html", { root: __dirname + "/public" });
});

// Automatically routes request for static files in the public folder
app.use(express.static("public"));

// Listen for requests on port 8080
app.listen(port, "0.0.0.0", () => {
  console.log("App is listening on port" + port);
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something not working!");
});

// Get all users
app.get(
  "/users",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    if (req.user.Username !== req.params.Username) {
      return res.status(400).send("Permission denied");
    }

    await Users.find()
      .then((users) => {
        res.status(201).json(users);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

/**
 * @description Get user information
 * @name GET /users/[username]
 * @example
 * Authentication: Bearer token (JWT)
 * @example
 * Request data format
 * none
 * @example
 * Response data format
 * [
 *   {
 *     "_id": "65034384a926abd2124b0655",
 *     "Username": "Tom Smith",
 *     "FavouriteFilms": [],
 *     "Password": "Chocolate22!",
 *     "Email": "tom.smith@outlook.com",
 *     "DOB": "01/03/1994",
 *
 *   }
 * ]
 */
app.get(
  "/users/:Username",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    // Check if the authenticated user has permission to retrieve their own information
    if (req.user.Username !== req.params.Username) {
      return res.status(400).send("Permission denied");
    }

    await Users.findOne({ Username: req.params.Username })
      // Find the user in the MongoDB collection with the specified username
      .then((users) => {
        // Respond with a JSON object containing the user's information
        res.status(201).json(users);
      })
      .catch((err) => {
        // Handle errors, log them, and send an error response
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

/**
 * @description Get user information
 * @name DELETE /users/[username]
 * @example
 * Authentication: Bearer token (JWT)
 * @example
 * Request data format
 * none
 * @example
 * Response data format
 * none
 */
app.delete(
  "/users/:Username",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    // Check if the authenticated user has permission to delete their own account
    if (req.user.Username !== req.params.Username) {
      return res.status(400).send("Permission denied");
    }

    await Users.findOneAndRemove({ Username: req.params.Username })
      // Find and remove the user from the MongoDB collection with the specified username
      .then((user) => {
        if (!user) {
          // Respond with an error if the user was not found
          res.status(400).send(req.params.Username + " was not found");
        } else {
          // Respond with a success message if the user was successfully deleted
          res.status(200).send(req.params.Username + " was deleted");
        }
      })
      .catch((err) => {
        // Handle errors, log them, and send an error response
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);
