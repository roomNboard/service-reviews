const redis = require('redis');

const client = redis.createClient('6379', '127.0.0.1');
client.auth('A1aAl3UDjW9WUN5oLKkq2Ajg3Tn/ee1z6wfd+EuCYFfAkKgGw1JYeAGOKZNu2KeO/9VN5fD9r6A5DEzE4')

client.on('error', (err) => {
  console.log(err);
});

client.config('SET', 'maxmemory', '500mb');
client.config('SET', 'maxmemory-policy', 'allkeys-lfu');