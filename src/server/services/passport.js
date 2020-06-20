const dotenv = require("dotenv");
const passport = require("passport");
const mongoose = require("mongoose");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = mongoose.model("users");

dotenv.config();

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => done(null, user));
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      // TODO: Save user to our database
      User.findOne({ googleId: profile.id }).then((existingUser) => {
        if (existingUser) {
          // LogIn
          done(null, existingUser);
        } else {
          new User({
            googleId: profile.id,
            name: profile.name.givenName,
          })
            .save()
            .then((user) => done(null, user));
        }
      });
    }
  )
);
