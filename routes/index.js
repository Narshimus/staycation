'Use strict';
let express = require('express');
let router = express.Router();
let passport = require('../config/passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.session.passport) {
    res.redirect('/dashboard');
  }
  res.render('index', {
    title: 'Express'
  });
});

//logout and destroy local session
router.get('/logout', function(req, res) {
  req.logout();
  req.session.destroy();
  return res.redirect('/');
});

//twitter authorization
router.get('/authz/twitter', passport.authenticate('twitter-authz'));

//twitter authorization callback
router.get('/authz/twitter/callback',
  passport.authenticate('twitter-authz', {
    failureRedirect: '/',
    successRedirect: '/dashboard'
  })
);

module.exports = router;
