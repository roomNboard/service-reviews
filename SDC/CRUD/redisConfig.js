const redis = require('redis');

const client = redis.createClient();

client.on('error', (err) => {
  console.log(err);
});

client.config('SET', 'maxmemory', '500mb');
client.config('SET', 'maxmemory-policy', 'allkeys-lfu');

module.exports = client;
