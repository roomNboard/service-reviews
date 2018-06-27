const faker = require('faker');
const fs = require('fs');

const userGenerator = (writer) => {
  let i = 1;
  const write = () => {
    let ok = true;
    do {
      if (i % 100000 === 0) {
        console.log(`${i} has been added`);
      }

      if (i === 1) {
        writer.write('id,first_name,last_name,avatar\n');
      } else if (i === 10000001) {
        // last time!
        writer.write(`${i},${faker.name.firstName()},${faker.name.lastName()},${faker.image.imageUrl(400, 400, 'people')}\n`);
        writer.end();
      } else {
        // see if we should continue, or wait
        // don't pass the callback, because we're not done yet.
        ok = writer.write(`${i},${faker.name.firstName()},${faker.name.lastName()},${faker.image.imageUrl(400, 400, 'people')}\n`);
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

userGenerator(fs.createWriteStream('/media/brian/Iomega/csv/randomUsers.csv'));
// real	0m25.768s
// user	0m21.284s
// sys	0m2.808s

