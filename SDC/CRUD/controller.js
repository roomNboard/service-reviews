const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./model.js');

const app = express();

app.use('/:id', express.static(path.join(__dirname, '../../public/')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/get', (req, res) => {
  const param = req.body.params;

  db.getListingReviews(param, (err, result) => {
    if (err) {
      return res.status(404).send(err);
    }

    res.status(201).send(result);
  });
});