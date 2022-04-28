const api = require('amqplib/callback_api');

/** Worker will act as consumer of created queues */
const QUEUE_TO_READ = 'FabSeries1';

/** Estabilsh connection with RabbitMQ server. DONT forget to use proper credentials */
api.connect('amqp://admin:admin@localhost', (err, connection) => {
    if (err) {
        console.log(err) 
        process.exit() 
    }
    /** Create channel from which we will read */
    connection.createChannel((error, channel) => {
        if (error) { 
            process.exit() 
        console.log(err) 

        }
        channel.assertQueue(QUEUE_TO_READ, { durable: false })
        channel.consume(QUEUE_TO_READ, (message) => {
            console.log('Worker1 has received messages')
            console.log(`${QUEUE_TO_READ} read. Message: ${message.content.toString()}`)
        }, { noAck: true });
    })
})