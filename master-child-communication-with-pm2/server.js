const express = require("express");
// No longer be used as pm2 handles processes, instead we use rabbitMQ with queues.
// const cluster = require('cluster');
const fabQueue1 = require('./queues/fab-queue1')
const fabQueue2 = require('./queues/fab-queue2')

const app = express();
// http://localhost:3001?number=10
app.get("/", (request, response) => {
    const number = Number.parseInt(request.query.number)
    number % 2 === 0 
    ? fabQueue1(number)
    : fabQueue2(number)
    response.send(`<h3>Request has been received successfully! We will send you and email once your calculation is ready.</h3>`);
});
app.listen(3001, () => console.log("Express App is running on PORT : 3001"));


