
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {twitter_ID: '123456789876543212', username: 'admin', access_token: '???', token_secret: '???', is_admin:true},
        {twitter_ID: '999999999999999999', username: 'user', access_token: '???', token_secret: '???', is_admin:false}
      ]);
    });
};
