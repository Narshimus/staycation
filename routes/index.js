'Use strict';
let express = require('express');
let router = express.Router();
let passport = require('../config/passport');
// let db = require('../models/db_models');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

//TODO dashboard
router.get('/dashboard', function(req, res) {
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
    //TODO db.findUser(req.account);
    res.redirect('/dashboard');
  });

module.exports = router;
