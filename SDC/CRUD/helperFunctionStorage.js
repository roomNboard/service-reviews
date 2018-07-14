const createStorage = (result, param) => {
  const storage = {};

  storage.totalNumberReviews = result.rowCount;
  storage.info = {
    id: param,
    roomName: result.rows[0].propertyname,
    totalNumberReviews: result.rowCount,
    reviews: [],
  };

  result.rows.forEach((element, index) => {
    storage.info.reviews.push(element);

    if (index !== 0) {
      storage.info.accuracy += element.accuracy;
      storage.info.communication += element.communication;
      storage.info.cleanliness += element.cleanliness;
      storage.info.location += element.location;
      storage.info.checkIn += element.checkin;
      storage.info.value += element.value;
    } else if (index === 0) {
      storage.info.accuracy = element.accuracy;
      storage.info.communication = element.communication;
      storage.info.cleanliness = element.cleanliness;
      storage.info.location = element.location;
      storage.info.checkIn = element.checkin;
      storage.info.value = element.value;
    }
  });
  storage.info.accuracy = Number((storage.info.accuracy / result.rowCount).toFixed(1));
  storage.info.communication = Number((storage.info.communication / result.rowCount).toFixed(1));
  storage.info.cleanliness = Number((storage.info.cleanliness / result.rowCount).toFixed(1));
  storage.info.location = Number((storage.info.location / result.rowCount).toFixed(1));
  storage.info.checkIn = Number((storage.info.checkIn / result.rowCount).toFixed(1));
  storage.info.value = Number((storage.info.value / result.rowCount).toFixed(1));
  return storage;
};

module.exports = createStorage;
