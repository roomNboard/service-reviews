const { exec } = require('child_process');

const property = 'time mongoimport --db reviews --collection property --type csv --headerline --file /media/brian/Iomega/csv/randomProperties.csv';
const reviews = 'time mongoimport --db reviews --collection reviews --type csv --headerline --file /media/brian/Iomega/csv/randomReviews.csv';
const users = 'time mongoimport --db reviews --collection users --type csv --headerline --file /media/brian/Iomega/csv/randomUsers.csv';

exec(property, (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
});

exec(reviews, (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
});

exec(users, (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
});
