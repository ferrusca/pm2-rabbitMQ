const express = require('express');
const redis = require('redis');
const config = require('./config');
const PORT = process.env.PORT || 3001

const app = express();
// http://localhost:3001?number=10
app.get("/", async (request, response) => {
  const client = redis.createClient({
    host: config.redisHost,
    port: config.redisPort,
  });
  await client.connect()

  const number = Number.parseInt(request.query.number)
  number % 2 === 0 
    ? client.publish('ChannelWorker1', number)
    : client.publish('ChannelWorker2', number)
  response.send(`<h3>Request has been sent to respective subscribers! You will receive an email once your calculation is ready.</h3>`);
});
app.listen(PORT, () => console.log("Express App is running on PORT : 3001"));


