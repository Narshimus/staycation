'Use strict';
let express = require('express');
let router = express.Router();
let userUtil = require('../models/user_util');
let config = require('../config/config');
let Twit = require('twit');
let path = require('path');
let db = require('../models/db_models')


//middleware for checking login status
router.use(userUtil.ensureLoggedIn(), (req, res, next) => {
  next();
});

//render dashboard page
//TODO database call
router.get('/', function(req, res) {
  res.sendFile('main.html', {
    root: path.join(__dirname, '../public')
  });
});

//get tweets by country name
router.get('/api/country/:countryName', function(req, res, next) {
  db.get('users', req.session.passport.user).then(function(results) {
    let client = new Twit({
      consumer_key: config.twitterAuth.consumerKey,
      consumer_secret: config.twitterAuth.consumerSecret,
      access_token: results.access_token,
      access_token_secret: results.token_secret
    });
  client.get('search/tweets', {
      q: `${req.params.countryName} travel OR tourism filter:images since:2015-07-11`,
      count: 10
    },
    function(err, data, response) {
      console.log(data);
      res.send(JSON.stringify(data.statuses));
    });
  });
});

//test twitter post
router.post('/twitter', function(req, res, next) {
  db.get('users', req.session.passport.user).then(function(results) {
    let client = new Twit({
      consumer_key: config.twitterAuth.consumerKey,
      consumer_secret: config.twitterAuth.consumerSecret,
      access_token: results.access_token,
      access_token_secret: results.token_secret
    });

    client.get('search/tweets', {
      q: 'china travel OR tourism OR nature filter:media since:2015-07-11',
      count: 10
    }, function(err, data, response) {
      console.log(data)
    })

    // client.post('statuses/update', {status: req.body.status},function(err, data, response){
    //   if (err) {
    //     console.log('there was a problem posting', err);
    //   }else {
    //     console.log('success');
    //   }
    // });
  });
});

module.exports = router;
