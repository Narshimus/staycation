'Use strict';

let knex = require('../db/knex');
let db = require('./db_models');

function findUser(twitterId){
  return knex('users').where('twitter_ID',twitterId).first().returning('id');
}

function createUser(accountInfo){
  return db.create('users', accountInfo);
}

function updateTokens(userId, token, tokenSecret){
  let tokens = {
    access_token : token,
    token_secret : tokenSecret
  };
  return db.update('users', userId, tokens);
}

function ensureLoggedIn() {
  return function(req, res, next) {
    if (!req.isAuthenticated || !req.isAuthenticated() || !req.session.passport) {
      res.status(401);
      res.redirect('/');
    } else {
      next();
    }
  };
}

module.exports = {
  findUser      : findUser,
  createUser    : createUser,
  updateTokens  : updateTokens,
  ensureLoggedIn: ensureLoggedIn
  // setUserSession: setUserSession

};
