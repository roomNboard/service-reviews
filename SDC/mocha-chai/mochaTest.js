const expect = require('chai').expect;
const request = require('request');
const db = require('../postgres/psqlConfig.js');

const options = {};

let table;
let q;
let param;

describe('GET request', () => {
  options.method = 'GET';
  options.url = 'http://localhost/3000/getReviews'

  it ('should retrieve data from the appropiate id', (done) => {
    table = 'reviews';

    request(options, () => {
      param = 9587489;
      q = `SELECT * FROM ${table} WHERE property_id = ${param}`;

      db.query(q, (err, result) => {
        expect(result.rows).to.have.lengthOf(7);
        expect(result).to.not.equal(null);
        expect(err).to.equal(undefined);
      });
    });
    done();
  });

  it ('should include property name in the result', (done) => {
    table = 'property';

    request(options, () => {
      param = 12345;
      q = `SELECT * FROM ${table} WHERE id = ${param}`;

      db.query(q, (err, result) => {
        expect(result.rows[0].property_name).to.equal('Sit enim.ls');
      });
    });
    done();
  });

  it ('It should be an object', (done) => {
    request(options, () => {
      table = 'reviews';
      param = 948574;

      q = `SELECT * FROM ${table} WHERE property_id = ${param}`;

      db.query(q, (err, result) => {
        expect(result.rows.length).to.equal(11);

        done();
      });
    });
  });
});

describe('POST request', () => {
  options.method = 'POST';
  options.url = 'http://localhost:3000/postReview';

  it ('It should include a new post', (done) => {
    table = 'reviews';
    param = [
      100000001,
      5493850,
      243448,
      'flying potatoes',
      'Jun 5 2016',
      1,
      2,
      3,
      4,
      5,
      1,
    ];

    request(options, () => {
      q = `INSERT INTO ${table} (id,property_id,user_id,text,date,accuracy,communication,cleanliness,location,check_in,value)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)`;

      db.query(q, param, (err1, result1) => {
        param = 100000001;
        request(options, () => {
          q = `SELECT text FROM ${table} WHERE id = ${param};`;
          db.query(q, (err2, result2) => {
            expect(result2.rowCount).to.equal(1);
          });
        });
        done();
      });
    });
  });
});

describe('DELETE request', () => {
  options.method = 'DELETE';
  options.url = 'http://localhost:3000/deleteReview';

  it ('Should delete the previous post', (done) => {
    param = 100000001;

    request(options, () => {
      q = `DELETE FROM ${table} WHERE id = ${param}`;

      db.query(q, param, (err, result) => {
        expect(result.rowCount).to.equal(1);
        done();
      });
    });
  });
});
