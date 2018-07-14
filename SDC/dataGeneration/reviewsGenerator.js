const faker = require('faker');
const fs = require('fs');

const reviewsGenerator = (writer) => {
  let i = 1;
  let z = 0;
  const write = () => {
    let ok = true;
    do {
      const j = i - 1;
      const dates = `${faker.date.past(10)}`;
      const accuracy = Number(`${faker.random.number({ min: 1, max: 5 })}`);
      const communication = Number(`${faker.random.number({ min: 1, max: 5 })}`);
      const cleanliness = Number(`${faker.random.number({ min: 1, max: 5 })}`);
      const location = Number(`${faker.random.number({ min: 1, max: 5 })}`);
      const checkIn = Number(`${faker.random.number({ min: 1, max: 5 })}`);
      const value = Number(`${faker.random.number({ min: 1, max: 5 })}`);

      if (i === 1) {
        writer.write('id,user_id,property_id,text,date,accuracy,communication,cleanliness,location,check_in,value\n');
      } else if (i === 50000001) {
        writer.write(`${j},${faker.random.number({ min: 1, max: 5000000 })},${z},${faker.lorem.sentences(1)},${dates.slice(4, 15)},${accuracy},${communication},${cleanliness},${location},${checkIn},${value}\n`);
        writer.end();
      } else {
        ok = writer.write(`${j},${faker.random.number({ min: 1, max: 5000000 })},${z},${faker.lorem.sentences(4)},${dates.slice(4, 15)},${accuracy},${communication},${cleanliness},${location},${checkIn},${value}\n`);
      }

      if (j % 5 === 0) {
        z += 1;
      }

      i += 1;
    } while (i <= 50000001 && ok);
    if (i <= 50000001) {
      writer.once('drain', write);
    }
  };
  write();
};

reviewsGenerator(fs.createWriteStream('/media/brian/Iomega/csv/randomReviews.csv'));
