'Use strict';

let knex = require('../db/knex');
let db = require('./db_models');

function findUser(twitterId){
  return knex('users').where('twitter_ID',twitterId).first().returning('id');
}

function createUser(accountInfo){
  return db.create('users', accountInfo);
}

function updateTokens(userId, accountInfo){
  let tokens = {
    access_token : accountInfo.access_token,
    token_secret : accountInfo.token_secret
  };
  return db.update('users', userId, tokens);
}

function setUserSession(req,res,userId){
  req.session.cookie.userId = userId;
  console.log(req.session);
  res.redirect('/dashboard');
}

module.exports = {
  findUser      : findUser,
  createUser    : createUser,
  updateTokens  : updateTokens,
  setUserSession: setUserSession
};
