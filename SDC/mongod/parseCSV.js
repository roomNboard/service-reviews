const fs = require('fs');
const path = require('path');

const parseCSV = (csvFile, callback) => {
  return new Promise((resolve, reject) => {
    const readable = fs.createReadStream(csvFile);

    readable.on('data', (data) => {
      callback(data);
    });

    readable.on('end', () => {
      resolve();
    });

    readable.on('error', (err) => {
      return reject(err);
    });
  });
};

const showMe = (data) => {
  const stringData = data.toString('utf8', 0, data.length).split('\n');

  for (let x = 0; x < stringData.length; x++) {
    const storage = JSON.parse(stringData[x].split(','));
    console.log(storage);
  }
};

parseCSV(path.join('/', 'media/brian/Iomega/csv/reviewsGenerator.csv'), showMe)
  .then((data) => {
    console.log('hooray');
  })
  .catch((error) => {
    console.log(error);
  });
