const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/', (err, result) => {
  if (err) {
    throw err;
  }

  console.log('database created!');
});

const database = mongoose.connection;

database.on('error', console.error.bind(console, 'connection error:'));
database.once('open', () => {
  console.log('HOORAH');
});


const Schema = mongoose.schema;

const properties = new Schema({
  id: Number,
  property_name: String,
});

const users = new Schema({
  id: Number,
  firstName: String,
  lastName: String,
  avatar: String,
});

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

const propertyReviews = new Schema({
  id: Number,
  total_reviews: Number,
  average_accuracy: Number,
  average_communication: Number,
  average_cleanliness: Number,
  average_location: Number,
  average_checkin: Number,
  average_value: Number,
});

const property = ('property', properties);
const user = ('users', users);
const review = ('reviews', reviews);
const propertyReview = ('propertyReviews', propertyReviews);
