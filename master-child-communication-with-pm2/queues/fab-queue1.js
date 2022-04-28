const api = require('amqplib/callback_api')
const fabObj = require('../math-logic/fibonacci-series')

const queueName = 'FabSeries1'

function sendValueToFabQueue(number) {
    // Establish connection with rabbitMQ server
    api.connect('amqp://admin:admin@localhost', (err, connection) => {
        if (err) { process.exit() }
        /** Create a channel where we will send the values to Queue */
        connection.createChannel((error, channel) => {
            if (error) { process.exit() }
            let result = fabObj.calculateFibonacciValue(number)
            /** We assert on queue. 
             * durable:false to avoid persistency on broker restart */
            channel.assertQueue(queueName, { durable: false })
            /** Send a message to the specified queue */
            channel.sendToQueue(queueName, Buffer.from(result.toString()))
            console.log(`Result ${number} sent to queue: ${queueName} `);
        })
    })
}

// Export used function
module.exports = sendValueToFabQueue;