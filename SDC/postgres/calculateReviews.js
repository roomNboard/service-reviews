const massive = require('massive');
const fs = require('fs');
const db = require('./testing.js');

const averageReviewsCalculator = (writer) => {
  let i = 1;

  const q = `SELECT r.accuracy, r.communication, r.cleanliness, r.location, r.checkin, r.value 
  FROM reviews r 
  INNER JOIN property p
  ON p.id = r.propertyId 
  WHERE p.id = ${i};`;

  const write = () => {
    let ok = true;
    do {
      if (i % 100000 === 0) {
        console.log(`${i} has been added`);
      }

      if (i === 10000000) {
        // last time!
        db.retrieveReviews(q, (result) => {
          for (var x = 0; x < result.length; x++) {
            writer.write(`${i},${result}`);
            writer.end();
          }
        });
      } else {
        // see if we should continue, or wait
        // don't pass the callback, because we're not done yet.
        db.retrieveReviews(q, (result) => {
          ok = writer.write(`${i},${result}`);
          writer.end();
        });
      }
      i += 1;
    } while (i <= 10000000 && ok);
    if (i <= 10000000) {
      // had to stop early!
      // write some more once it drains
      writer.once('drain', write);
    }
  };
  write();
};

averageReviewsCalculator(fs.createWriteStream('/media/brian/Iomega/csv/listingAverageReviews.csv'));
