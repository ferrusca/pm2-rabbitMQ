const express = require("express");
const cluster = require('cluster');
const totalCPUs = require('os').cpus().length

const fabObj = require("./math-logic/fibonacci-series");

if (cluster.isMaster) {
    console.log('total number of CPUs is', totalCPUs);
    console.log(`Master Process PID is ${process.pid}`)

    /** Create two workers using `child_process` module */
    const worker1 = require('child_process').fork('./workers/fab-series-worker1')
    const worker2 = require('child_process').fork('./workers/fab-series-worker2')

    console.log(`Child process PID is ${worker1.pid}`)
    console.log(`Child process PID is ${worker2.pid}`)

    worker1.on('message', result => {
        console.log(`Fibonacci result from Worker1: ${result}`)
    })

    worker2.on('message', result => {
        console.log(`Fibonacci result from Worker2: ${result}`)
    })

    /** When a child receives a connection, master decide which worker will handle this */
    cluster.on('online', worker => {
        console.log(`Message received from ${worker.process.pid}`)
        worker.on('message', number => {
            console.log(`number received on worker: ${number}`)
            number % 2 === 0 ? worker1.send(number) : worker2.send(number)
        })
    })

    /** Fork processes to remaining CPU cores, to handle connections from the client **/
    for (let i = 0; i < totalCPUs -2; i++) {
        const worker = cluster.fork();
        console.log(`Worker started with PID - ${worker.process.pid}`)
    }
} else {
    // This is a worker process
    const app = express();
    // http://localhost:3001?number=10
    app.get("/", (request, response) => {
        console.log(`Worker process with PID ${cluster.worker.process.pid} has accepted the request!.`)
        process.send(Number.parseInt(request.query.number));
        response.end(`<h3>Request has been received successfully! We will send you and email once your calculation is ready.</h3>`);
    });
    app.listen(3001, () => console.log("Express App is running on PORT : 3001"));

}

