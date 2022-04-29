const redis = require('redis');
const config = require('../config');
const fabObj = require('../math-logic/fibonacci-series')

const CHANNEL_READ = 'ChannelWorker1';

async function connectRedis() {
  const client = redis.createClient({
    host: config.redisHost,
    port: config.redisPort,
  });
  await client.connect();
  
  client.subscribe(CHANNEL_READ, (message) => {
    const result = fabObj.calculateFibonacciValue(message);
    console.log(`Worker: fibonacci series value is -> ${result}`)
  })
}

connectRedis().then()