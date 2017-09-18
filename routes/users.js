let express = require('express');
let router = express.Router();
let db = require('../models/db_models');

/* GET users listing. */
router.get('/', function(req, res, next) {
  db.list('users').then(function(results) {
    console.log(results);
    res.render('users', {
      title: 'Users',
      users: results
    });
  });
});

module.exports = router;
