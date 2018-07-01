const db = require('massive');

module.exports = {
  getListingReviews: (params, callback) => {
    const param = params.id;
    const q = `SELECT p.property_name AS propertyName, u.first_name AS firstName, u.last_name AS u.lastName, u.avatar, `

    db.query()
  }
}