const faker = require('faker');
const fs = require('fs');

const userGenerator = (writer) => {
  let i = 1;
  const write = () => {
    let ok = true;
    do {
      const j = i - 1;

      if (i === 1) {
        writer.write('id,first_name,last_name,avatar\n');
      } else if (i === 5000001) {
        writer.write(`${j},${faker.name.findName()},${faker.image.imageUrl(400, 400, 'people')}\n`);
        writer.end();
      } else {
        ok = writer.write(`${j},${faker.name.firstName()},${faker.image.imageUrl(400, 400, 'people')}\n`);
      }
      i += 1;
    } while (i <= 5000001 && ok);
    if (i <= 5000001) {
      writer.once('drain', write);
    }
  };
  write();
};

userGenerator(fs.createWriteStream('/media/brian/Iomega/csv/randomUsers.csv'));
