const db = require('../postgres/psqlConfig.js');

db.connect().then(() => {
  console.log('database connected');
}).catch((error) => {
  console.log('error in database', error);
});

module.exports = {
  getListingReviews: (id, callback) => {
    const q = `SELECT p.id, p.property_name AS propertyName, u.username, u.avatar, r.text, r.date, r.accuracy, r.communication, r.cleanliness, r.location, r.check_in AS checkIn, r.value
    FROM reviews AS r
    INNER JOIN property AS p
    ON r.property_id = p.id
    INNER JOIN users AS u
    ON r.user_id = u.id
    WHERE p.id = ${id};`;

    db.query(q, (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result);
      }
    });
  },

  postListingReview: (params, callback) => {
    const parameters = [
      params.id,
      params.user_id,
      params.property_id,
      params.text, params.date,
      params.accuracy,
      params.communication, params.cleanliness,
      params.location,
      params.checkIn,
      params.value,
    ];

    const q = `INSERT INTO reviews (id,user_id, property_id, text, date, accuracy, communication, cleanliness, location, check_in, value)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);`;

    db.query(q, parameters, (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result);
      }
    });
  },

  deleteReview: (params, callback) => {
    const q = `DELETE FROM reviews WHERE id = ${params};`;
    db.query(q, (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result);
      }
    });
  },

  getProperty: (params, callback) => {
    const q = `SELECT property_name FROM property WHERE id = ${params};`;

    db.query(q, (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result);
      }
    });
  },

  getReviews: (params, callback) => {
    const q = `SELECT r.text, r.accuracy, r.communication, r.cleanliness, r.location, r.check_in AS checkIn, r.value
      FROM reviews r
      INNER JOIN property
      ON r.property_id = property.id
      WHERE property.id = ${params};`;

    db.query(q, (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result);
      }
    });
  },

  getUsers: (params, callback) => {
    const q = `SELECT u.first_name, u.last_name, u.avatar
      FROM users u
      INNER JOIN reviews r
      ON r.user_id = u.id
      INNER JOIN property p
      ON p.id = r.property_id
      WHERE p.id = ${params};`;

    db.query(q, (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result);
      }
    });
  },
};
