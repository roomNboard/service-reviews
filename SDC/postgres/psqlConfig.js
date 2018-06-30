const pg = require('pg');
const Pool = require('pg-pool');

const db = new Pool({
  database: 'reviews',
  user: 'brian',
  password: 'ABCdef123!',
  port: 5432,
});
// const db = new pg.Client('postgres://brian:ABCdef123!@localhost:5432/reviews');

module.exports = db;
