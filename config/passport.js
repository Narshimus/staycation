'Use strict';
//dependencies
let passport = require('passport');
let config = require('./config');

//passport variables
let TwitterStrategy = require('passport-twitter').Strategy;
let consumerKey = config.twitterAuth.consumerKey;
let consumerSecret = config.twitterAuth.consumerSecret;
let twitterCallbackURL = config.twitterAuth.callbackURL;

//twitter strategy
passport.use('twitter-authz', new TwitterStrategy({
  consumerKey    : consumerKey,
  consumerSecret : consumerSecret,
  callbackURL    : twitterCallbackURL
},
function(token, tokenSecret, profile, done){
  console.log(profile._json);
  let user = {
    access_token : token,
    token_secret : tokenSecret,
    twitter_ID   : profile._json.id_str,
    username     : profile._json.name,
    profile_pic  : profile._json.profile_image_url
  };
  done(null, user);
}));

module.exports = passport;
