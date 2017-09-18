'Use strict';

let knex = require('../db/knex');

module.exports = {

  list: table => knex(table),

  get: (table, id) => knex(table).where('id', id).first(),

  getQuery: (table, query, value) => knex(table).where(query, value),

  create: (table, data) => knex(table).insert(data).returning('*'),

  update: (table, id, data) => knex(table).update(data).where('id', id).returning('*'),

  updateValue: (table, id, param, value) => knex(table)
    .update(param, value).where('id', id).returning(param),

  remove: (table, query, value) => knex(table).where(query, value).del()

};
