const fs = require('fs');

const getRandomIntInclusive = (min, max) => {
  const minimum = Math.ceil(min);
  const maximum = Math.floor(max);
  return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum; //The maximum is inclusive and the minimum is inclusive 
};

const getRandomIdGenerator = (writer) => {
  let i = 1;
  const write = () => {
    let ok = true;
    do {
      let x = getRandomIntInclusive(9000000, 10000000);
      // if (i % 25 === 0) {
      //   console.log(`${i} has been added`);
      // }
      if (i === 10) {
        // last time!
        writer.write(`${x}\n`);
        writer.end();
      } else {
        // see if we should continue, or wait
        // don't pass the callback, because we're not done yet.
        ok = writer.write(`${x}\n`);
      }
      i += 1;
    } while (i <= 10 && ok);
    if (i <= 10) {
      // had to stop early!
      // write some more once it drains
      writer.once('drain', write);
    }
  };
  write();
};

getRandomIdGenerator(fs.createWriteStream('/media/brian/Iomega/csv/artilleryIdGenerator10.csv'));
