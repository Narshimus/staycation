'Use strict';
let express = require('express');
let router = express.Router();
let passport = require('../config/passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.isAuthenticated()) {
    res.redirect('/dashboard')
  } else {
    res.render('index', {
      title: 'Express'
    });
  }
});

//logout and destroy local session
router.post('/logout', function(req, res) {
  req.logout();
  req.session.destroy(function(err) {
    res.redirect('/');
  });
});

router.get('/confirm-login', function(req,res){
  if (req.isAuthenticated()) {
    res.send(req.session);
  }else {
    res.sendStatus(401);
  }
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
