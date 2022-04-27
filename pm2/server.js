const express = require("express");
const cluster = require('cluster');
const totalCPUs = require('os').cpus().length

const fabObj = require("./math-logic/fibonacci-series");

if (cluster.isMaster) {
    console.log('total number of CPUs is', totalCPUs);

    for (let i = 0; i < totalCPUs; i++) {
        cluster.fork();
    }

    cluster.on('online', worker => {
        console.log('Worker ID is ', worker.id, ' and PID is ', worker.process.pid)
    })
    cluster.on('exit', worker => {
        console.log('Offline: Worker ID is ', worker.id, ' and PID is ', worker.process.pid)
        console.log("lets fork a new worker...")
        cluster.fork()
    })
} else {
    // This is a worker process
    const app = express();
    // http://localhost:3000?number=10
    app.get("/", (request, response) => {
        console.log("worker process with PID", cluster.worker.process.pid, ' has accepted the request!.')
        let number = fabObj.calculateFibonacciValue(Number.parseInt(request.query.number));
        response.send(`<h1>${number}</h1>`);
    });
    app.listen(3001, () => console.log("Express App is running on PORT : 3001"));

}

