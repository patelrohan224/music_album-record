require("dotenv").config();
const jwt = require("jsonwebtoken");
const passport = require('passport');
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const {v4: uuidV4} = require('uuid');

const artistSchema = require("../models/artist.m")

passport.use(new GoogleStrategy({
    clientID:     process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // callbackURL: "https://shielded-sands-21994.herokuapp.com/auth/google/callback",
    callbackURL: "http://localhost:2345/auth/google/callback",
    userProfileURL: "https://**www**.googleapis.com/oauth2/v3/userinfo",
    passReqToCallback: true
  },
  async function(request, accessToken, refreshToken, profile, done) {
    const email = profile?._json?.email

    let user;
    try { 
      user = await artistSchema.findOne({email}).lean().exec();

      if(!user) {
        user = await artistSchema.create({
          email: email,
          password: uuidV4()
        })
      }

      const token = jwt.sign({user}, process.env.JWT_SECRET_KEY);
      return done(null, {user, token})

    } catch(err) {
      console.log("err", err)
    }
  }
));

module.exports = passport