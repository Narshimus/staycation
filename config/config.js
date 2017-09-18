module.exports = {
  'twitterAuth' : {
    'consumerKey'     : process.env.CONSUMERKEY,
    'consumerSecret'  : process.env.CONSUMERSECRET,
    'callbackURL'     : 'http://localhost:3000/authz/twitter/callback'
  }
};
