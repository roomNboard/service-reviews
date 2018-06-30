const faker = require('faker');
const fs = require('fs');

const reviewsGenerator = (writer) => {
  let i = 1;
  const write = () => {
    let ok = true;
    do {
      const j = i - 1;
      const dates = `${faker.date.past(10)}`;
      const propertyId = `${faker.random.number({ min: 1, max: 10000000 })}`;
      const accuracy = Number(`${faker.random.number({ min: 1, max: 5 })}`);
      const communication = Number(`${faker.random.number({ min: 1, max: 5 })}`);
      const cleanliness = Number(`${faker.random.number({ min: 1, max: 5 })}`);
      const location = Number(`${faker.random.number({ min: 1, max: 5 })}`);
      const checkIn = Number(`${faker.random.number({ min: 1, max: 5 })}`);
      const value = Number(`${faker.random.number({ min: 1, max: 5 })}`);

      // fillReviewStorage(
      //   propertyId,
      //   accuracy,
      //   communication,
      //   cleanliness,
      //   location,
      //   checkIn,
      //   value,
      // );

      if (i % 100000 === 0) {
        console.log(`${i} has been added`);
      }

      if (i === 1) {
        writer.write('id,user_id,property_id,text,date,accuracy,communication,cleanliness,location,check_in,value\n');
      } else if (i === 100000001) {
        // last time!

        writer.write(`${j},${faker.random.number({ min: 1, max: 10000000 })},${propertyId},${faker.lorem.sentences(4)},${dates.slice(4, 15)},${accuracy},${communication},${cleanliness},${location},${checkIn},${value}\n`);
        writer.end();
        // writer.on('finish', () => {
        //   averageReviews(fs.createWriteStream('./postgres/averageReviews.csv'));
        // });
      } else {
        // see if we should continue, or wait
        // don't pass the callback, because we're not done yet.
        ok = writer.write(`${j},${faker.random.number({ min: 1, max: 10000000 })},${propertyId},${faker.lorem.sentences(4)},${dates.slice(4, 15)},${accuracy},${communication},${cleanliness},${location},${checkIn},${value}\n`);
      }
      i += 1;
    } while (i <= 100000001 && ok);
    if (i <= 100000001) {
      // had to stop early!
      // write some more once it drains
      writer.once('drain', write);
    }
  };
  write();
};

reviewsGenerator(fs.createWriteStream('/media/brian/Iomega/csv/randomReviews.csv'));
// For 100 million records:
// real	33m19.613s
// user	28m12.818s
// sys	2m10.799s


// const reviewStorage = {};
// const fillReviewStorage = (
//   propertyId,
//   acc,
//   com,
//   clean,
//   loc,
//   check,
//   val,
// ) => {
//   if (reviewStorage[propertyId]) {
//     reviewStorage[propertyId].count += 1;
//     reviewStorage[propertyId].accuracy += acc;
//     reviewStorage[propertyId].communication += com;
//     reviewStorage[propertyId].cleanliness += clean;
//     reviewStorage[propertyId].location += loc;
//     reviewStorage[propertyId].checkIn += check;
//     reviewStorage[propertyId].value += val;
//   } else {
//     reviewStorage[propertyId] = {
//       count: 1,
//       accuracy: acc,
//       communication: com,
//       cleanliness: clean,
//       location: loc,
//       checkIn: check,
//       value: val,
//     };
//   }
// };

// const averageReviews = (writer) => {
//   let i = 1;
//   const reviewCalculations = Object.entries(reviewStorage);

//   const write = () => {
//     let ok = true;
//     let id;
//     let propertyId;
//     let averageAcc;
//     let averageCom;
//     let averageClean;
//     let averageLoc;
//     let averageCheck;
//     let averageVal;

//     while (i < reviewCalculations.length && ok) {
//       id = reviewCalculations[i];
//       const [propId, average] = id;
//       const {
//         accuracy,
//         communication,
//         cleanliness,
//         location,
//         checkIn,
//         value,
//         count,
//       } = average;

//       propertyId = propId;
//       averageAcc = accuracy / count;
//       averageCom = communication / count;
//       averageClean = cleanliness / count;
//       averageLoc = location / count;
//       averageCheck = checkIn / count;
//       averageVal = value / count;

//       if (i % 100000 === 0) {
//         console.log(`${i} has been added`);
//       }

//       if (i === 1) {
//         writer.write('id,total_reviews,average_accuracy,average_communication,average_cleanliness,average_location,average_checkin,average_value\n');
//       } else if (i !== reviewCalculations.length) {
//         ok = writer.write(`${propertyId},${count},${averageAcc.toFixed(1)},${averageCom.toFixed(1)},${averageClean.toFixed(1)},${averageLoc.toFixed(1)},${averageCheck.toFixed(1)},${averageVal.toFixed(1)}\n`);
//       } else {
//         writer.write(`${propertyId},${count},${averageAcc.toFixed(1)},${averageCom.toFixed(1)},${averageClean.toFixed(1)},${averageLoc.toFixed(1)},${averageCheck.toFixed(1)},${averageVal.toFixed(1)}\n`);
//         writer.end();
//       }
//       i += 1;
//     }

//     if (i < reviewCalculations.length) {
//       writer.once('drain', write);
//     }
//   };
//   write();
// };

