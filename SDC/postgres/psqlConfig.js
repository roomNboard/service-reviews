const Pool = require('pg-pool');

const db = new Pool({
  database: 'reviews',
  user: 'brian',
  password: 'ABCdef123',
  port: '5432',
});

module.exports = db;

