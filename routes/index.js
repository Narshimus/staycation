'Use strict';
let express = require('express');
let router = express.Router();
let passport = require('../config/passport');
let db = require('../models/db_models');
let userUtil = require('../models/user_util')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

//TODO dashboard

function ensureLoggedIn() {
  return function(req, res, next) {
    // isAuthenticated is set by `deserializeUser()`
    if (!req.isAuthenticated || !req.isAuthenticated()) {
      res.status(401).send({
        success: false,
        message: 'You need to be authenticated to access this page!'
      })
    } else {
      next()
    }
  }
}

router.get('/dashboard', ensureLoggedIn(), (req, res, next) => {
  res.send({ success: true, message: 'You are authenticated' })
})

router.get('/dashboard', function(req, res) {
  console.log('//////////dashboard');
  console.log(req.session);
  // req.session.destroy();
  res.sendStatus(200);
});

//twitter authorization
router.get('/authz/twitter', passport.authorize('twitter-authz'));

//twitter authorization callback
//TODO handle response
router.get('/authz/twitter/callback',
  passport.authorize('twitter-authz', {
    failureRedirect: '/'
  }),
  function(req, res) {
    //check if user exists in database
    userUtil.findUser(req.account.twitter_ID)
      .then(function(results) {
        //if user does not exist create a new entry
        if (!results) {
          userUtil.createUser(req.account).then(function(newUser) {
            userUtil.setUserSession(req, res, newUser[0].id);
          });
          //if user already exists update access tokens
        } else {
          userUtil.updateTokens(results.id, req.account).then(function() {
            userUtil.setUserSession(req, res, results.id);
          });
        }
      });
  });

module.exports = router;
