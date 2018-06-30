// Cluster

if (cluster.isMaster) {
  for (let x = 0; x < numCPUs.length; x++) {
    cluster.fork();
    console.log('forked:', numCPUs.length);
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  app.get('/getReviews/:id', (req, res) => {
    const param = req.params.id;

    pdb.getListingReviews(param, (err, result) => {
      if (err) {
        return res.status(404).send(err);
      }

      res.status(200).send(result.rows);
    });

    app.listen(PORT, () => {
      console.log('Listening on Port: ', PORT);
    });
  });
}
