const jwtSecret = "your_jwt_secret";

const jwt = require("jsonwebtoken"),
  passport = require("passport");

require("./passport");

let generateJWTToken = (user) => {
  return jwt.sign(user, jwtSecret, {
    subject: user.Username,
    expiresIn: "7d",
    algorithm: "HS256",
  });
};

module.exports = (router) => {
  /**
   * @description Register user
   * @name POST /users?Username=[username]&Password=[password]
   * @example
   * Request data format
   * none
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
  router.post("/login", (req, res) => {
    console.log("Received login request with data:", req.body);

    // Use local strategy for passport authentication
    passport.authenticate("local", { session: false }, (error, user, info) => {
      if (error || !user) {
        return res.status(400).json({
          message: "Something is not right",
          user: user,
        });
      }
      // Log in the user and generate a JWT token
      req.login(user, { session: false }, (error) => {
        if (error) {
          res.send(error);
        }
        let token = generateJWTToken(user.toJSON());
        // Respond with the user details and the generated JWT token
        return res.json({ user, token });
      });
    })(req, res);
  });
};
