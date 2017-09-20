'Use strict';
//dependencies
let passport = require('passport');
let config = require('./config');
let userUtil = require('../models/user_util');
let db = require('../models/db_models');

//passport variables
let TwitterStrategy = require('passport-twitter').Strategy;
let consumerKey = config.twitterAuth.consumerKey;
let consumerSecret = config.twitterAuth.consumerSecret;
let twitterCallbackURL = config.twitterAuth.callbackURL;

//session config
passport.serializeUser(function(id, done) {
  console.log('serializeUser', id);
  done(null, id);
});

passport.deserializeUser(function(id, done) {
  db.get('users', id).then(function(results) {
    if (results) {
      return done(null, id);
    } else {
      return done(err);
    }
  });
});

//twitter strategy
passport.use('twitter-authz', new TwitterStrategy({
    consumerKey: consumerKey,
    consumerSecret: consumerSecret,
    callbackURL: twitterCallbackURL
  },
  function(token, tokenSecret, req, profile, done) {
    //check if user is logged in
    // if (!req.user_id) {
    if (true) {

      userUtil.findUser(profile._json.id_str).then(function(results, err) {
        //check if user exists in database
        if (results) {
          //if user exists => update access tokens
          userUtil.updateTokens(results.id, token, tokenSecret).then(function() {
            done(null, results.id);
          });
        } else {
          //if user does not exist => create new database entry
          let newUser = {
            access_token: token,
            token_secret: tokenSecret,
            twitter_ID: profile._json.id_str,
            username: profile._json.name
            // ,
            // profile_pic  : profile._json.profile_image_url
          };
          userUtil.createUser(req.account).then(function(newDatabaseEntry) {
            done(null, newDatabaseEntry.id);
          });
        }
      });
    } else {
      userUtil.updateTokens(req.user_id, token, tokenSecret).then(function() {
        done(null, req.user_id);
      });
    }
  }));

module.exports = passport;
