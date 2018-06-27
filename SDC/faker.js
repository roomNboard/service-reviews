const faker = require('faker');

module.exports = {
  fakers: {
    propertyName: () => faker.company.companyName(),
    userId: () => faker.random.number({ min: 1, max: 1000000 }),
    propertyId: () => faker.random.number({ min: 1, max: 1000000 }),
    text: () => faker.lorem.sentences(4),
    date: () => faker.date.past(10),
    accuracy: () => faker.random.number({ min: 1, max: 5 }),
    communication: () => faker.random.number({ min: 1, max: 5 }),
    cleanlness: () => faker.random.number({ min: 1, max: 5 }),
    location: () => faker.random.number({ min: 1, max: 5 }),
    checkin: () => faker.random.number({ min: 1, max: 5 }),
    value: () => faker.random.number({ min: 1, max: 5 }),
  },
};
