const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/');

const db = mongoose.connection;

db.once('open', () => {
  console.log('HOORAH');
}).on('error', console.error.bind(console, 'connection error:'));


const Schema = mongoose.schema;

const reviews = new Schema({
  id: Number,
  userId: Number,
  propertyId: Number,
  text: String,
  date: Date,
  accuracy: Number,
  communication: Number,
  cleanliness: Number,
  location: Number,
  checkIn: Number,
  value: Number,
});

module.exports = reviews;
