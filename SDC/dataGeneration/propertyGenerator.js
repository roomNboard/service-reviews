const faker = require('faker');
const fs = require('fs');

const propertyGenerator = (writer) => {
  let i = 1;
  const write = () => {
    let ok = true;
    do {
      let j = i -1;
      if (i % 100000 === 0) {
        console.log(`${i} has been added`);
      }

      if (i === 1) {
        writer.write('id,property_name\n');
      } else if (i === 10000001) {
        // last time!
        writer.write(`${j},${faker.lorem.sentence(2, false, 2)}\n`);
        writer.end();
      } else {
        // see if we should continue, or wait
        // don't pass the callback, because we're not done yet.
        ok = writer.write(`${j},${faker.lorem.sentence(2, false, 2)}\n`);
      }
      i += 1;
    } while (i <= 10000001 && ok);
    if (i <= 10000001) {
      // had to stop early!
      // write some more once it drains
      writer.once('drain', write);
    }
  };
  write();
};

propertyGenerator(fs.createWriteStream('/media/brian/Iomega/csv/randomProperties.csv'));
// real	0m20.683s
// user	0m19.231s
// sys	0m1.918s
