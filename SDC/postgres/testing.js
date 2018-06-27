const massive = require('massive');

module.exports = {
  retrieveReviews: (q, callback) => {
    massive({
      host: 'localhost',
      database: 'reviews',
      user: 'brian',
      password: 'ABCdef123!',
    }).then((db) => {
      db.query(q)
        .then((result) => {
          const calcAverage = (data) => {
            let storage = {};
            storage.accuracy = 0;
            storage.communication = 0;
            storage.cleanliness = 0;
            storage.checkin = 0;
            storage.value = 0;

            for (let x = 0; x < data.length; x++) {
              const current = data[x];

              storage.accuracy += current.accuracy;
              storage.communication += current.communication;
              storage.cleanliness += current.cleanliness;
              storage.checkin += current.checkin;
              storage.value += current.value;

              if (x === data.length - 1) {
                storage = Object.values(storage);
                return storage.map((entry) => {
                  return Number((entry / data.length).toFixed(1));
                });
              }
            }

            return storage;
          };

          callback(calcAverage(result));
        })
        .catch((error) => {
          console.log(error);
        });
    }).catch((err) => {
      console.log(err);
    });
  },
};
