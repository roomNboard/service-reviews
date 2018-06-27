const faker = require('faker');
const fs = require('fs');

const propertyGenerator = (writer) => {
  let i = 1;
  const write = () => {
    let ok = true;
    do {
      if (i % 100000 === 0) {
        console.log(`${i} has been added`)
      }

      if (i === 10000000) {
        // last time!
        writer.write(faker.company.companyName());
        writer.end();
      } else {
        // see if we should continue, or wait
        // don't pass the callback, because we're not done yet.
        ok = writer.write(faker.company.companyName());
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

propertyGenerator(fs.createWriteStream('./csv/randomProperties.txt'));
