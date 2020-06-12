require('dotenv').config();

//Packages
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");

//App Variables
const secret = process.env.SECRET;
const User = mongoose.model("users");
const opts = { expiresIn: '5', jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), secretOrKey: secret };

module.exports = passport => {
    passport.use(
      new JwtStrategy(opts, (jwt_payload, done) => {
        User.findById(jwt_payload.id).then(user => {
            if (user) {
              return done(null, user);
            }
            return done(null, false);
          })
          .catch(err => console.log(err));
      })
    );
  };
  