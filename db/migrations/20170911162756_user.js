exports.up = (knex, Promise) => {
  return knex.schema.createTable('users', (table) => {
    table.increments();
    table.string('username').unique().notNullable();
    table.string('access_token').notNullable();
    table.string('token_secret').notNullable();
    table.string('twitter_ID').notNullable();
    // table.string('email').unique().notNullable();
    // table.string('timezone').notNullable();
    table.boolean('is_admin').defaultTo(false);
    table.timestamps(true,true);
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('users');
};
