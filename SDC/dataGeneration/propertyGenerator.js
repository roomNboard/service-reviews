const faker = require('faker');
const fs = require('fs');

const propertyGenerator = (writer) => {
  let i = 1;
  const write = () => {
    let ok = true;
    do {
      const j = i - 1;

      if (i === 1) {
        writer.write('id,property_name\n');
      } else if (i === 10000001) {
        writer.write(`${j},${faker.lorem.sentence(2, false, 2)}\n`);
        writer.end();
      } else {
        ok = writer.write(`${j},${faker.lorem.sentence(2, false, 2)}\n`);
      }
      i += 1;
    } while (i <= 10000001 && ok);
    if (i <= 10000001) {
      writer.once('drain', write);
    }
  };
  write();
};

propertyGenerator(fs.createWriteStream('/media/brian/Iomega/csv/randomProperties.csv'));
