'Use strict';
let express = require('express');
let router = express.Router();
let userUtil = require('../models/user_util');
let db = require('../models/db_models');
let config = require('../config/config');
let Twit = require('twit');

//middleware for checking login status
router.use(userUtil.ensureLoggedIn(), (req, res, next) => {
  next();
});

//render dashboard page
//TODO database call
router.get('/', function(req, res) {
  res.render('dashboard', {
    title: 'Dashboard'
  });
});

//test twitter post
router.post('/twitter', function(req, res, next){
  db.get('users',req.session.passport.user).then(function(results){
    let client = new Twit({
      consumer_key        : config.twitterAuth.consumerKey,
      consumer_secret     : config.twitterAuth.consumerSecret,
      access_token        : results.access_token,
      access_token_secret : results.token_secret
    });
    client.post('statuses/update', {status: req.body.status},function(err, data, response){
      if (err) {
        console.log('there was a problem posting', err);
      }else {
        console.log('success');
      }
    });
  });
});

module.exports = router;
