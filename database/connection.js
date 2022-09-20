var knex = require('knex')({
    client: 'mysql2',
    connection: {
      host : '127.0.0.1',
      user : 'admin',
      password : 'P@ssw0rd',
      database : 'banco_users'
    }
  });

module.exports = knex