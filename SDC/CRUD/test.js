const pg = require('pg');

const client = new pg.Client('postgres://brian:ABCdef123!@:5432/reviews');

client.connect((err) => {
  if (err) throw err;
  console.log('fuck this');
});

client.query('SELECT * FROM reviews where id = 5;', (err, results) => {

  if (err) {
    console.log('WE GOT AN ERRROR:', err);
  } else {
    console.log('CHICKEN DINNER!!!!', results);
  }
});
