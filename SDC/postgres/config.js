const massive = require('massive');

let db;

module.exports = () => {
  if (db) {
    return db;
  }

  massive({
    host: 'localhost',
    database: 'reviews',
    user: 'brian',
    password: 'ABCdef123!',
  })
    .then((instance) => {
      db = instance;

      return Promise.resolve(db);
    }).catch((err) => {
      if (err) throw err;
    });
};
