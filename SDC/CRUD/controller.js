// require('newrelic');

const express = require('express');
const bodyParser = require('body-parser');
// const cluster = require('cluster');
// const numCPUs = require('os').cpus();
const pdb = require('./psqlModel.js');
const client = require('./redisConfig.js');

const app = express();
const PORT = 3000;
// app.use(express.static(path.join(__dirname, '../../public/')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const cache = (req, res, next) => {
  const param = req.params.id;

  client.get(param, (err, result) => {
    if (err) {
      res.status(404).send(err);
    }

    if (result !== null) {
      res.status(200).send(result);
    } else {
      next();
    }
  });
};

app.get('/getReviews/:id', cache, (req, res) => {
  const param = req.params.id;

  pdb.getListingReviews(param, (err, result) => {
    if (err) {
      return res.status(404).send(err);
    }

    client.setex(param, 3000, JSON.stringify(result.rows));
    res.status(200).send(result.rows);
  });
});

app.post('/postReview', (req, res) => {
  const param = req.query;
  pdb.postListingReview(param, (err) => {
    if (err) {
      return res.status(500).send(err);
    }

    res.status(201).send();
  });
});

app.delete('/deleteReview', (req, res) => {
  const param = req.query;

  pdb.deleteListingReview(param, (err) => {
    if (err) {
      return res.status(404).send(err);
    }

    res.status(204).send();
  });
});

app.listen(PORT, () => {
  console.log('Listening on Port: ', PORT);
});


// Cluster Code

// if (cluster.isMaster) {
//   for (let x = 0; x < numCPUs.length; x++) {
//     cluster.fork();
//     console.log('forked:', numCPUs.length);
//   }

//   cluster.on('exit', (worker, code, signal) => {
//     console.log(`worker ${worker.process.pid} died`);
//   });
// } else {
//   app.get('/getReviews/:id', (req, res) => {
//     const param = req.params.id;

//     pdb.getListingReviews(param, (err, result) => {
//       if (err) {
//         return res.status(404).send(err);
//       }

//       res.status(200).send(result.rows);
//     });

//     app.listen(PORT, () => {
//       console.log('Listening on Port: ', PORT);
//     });
//   });
// }