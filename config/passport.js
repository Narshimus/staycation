'Use strict';
//dependencies
let passport = require('passport');
let config = require('./config');

//passport variables
let TwitterStrategy = require('passport-twitter').Strategy;
let consumerKey = config.twitterAuth.consumerKey;
let consumerSecret = config.twitterAuth.consumerSecret;
let twitterCallbackURL = config.twitterAuth.callbackURL;

//session config
passport.serializeUser(function(user, done) {
  console.log('serializeUser');
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  console.log('yo');
  User.findById(id, function(err, user) {
    if(err) {
      console.error('There was an error accessing the records of' +
      ' user with id: ' + id);
      return done(err);
    }
    return done(null, user);
  });
});

//twitter strategy
passport.use('twitter-authz', new TwitterStrategy({
  consumerKey    : consumerKey,
  consumerSecret : consumerSecret,
  callbackURL    : twitterCallbackURL
},
function(token, tokenSecret, profile, done){
  let user = {
    access_token : token,
    token_secret : tokenSecret,
    twitter_ID   : profile._json.id_str,
    username     : profile._json.name
    // ,
    // profile_pic  : profile._json.profile_image_url
  };
  done(null, user);
}));

module.exports = passport;
