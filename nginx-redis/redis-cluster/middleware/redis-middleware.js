const redis = require('redis')
const config = require('./config')

async function getRedisClient() {
    const client = redis.createClient({
        url: `redis://${config.redisHost}:${config.redisPort}`
    });
    /** in v4, wait until establish the connection */
    await client.connect()
    return client;
}


async function redisMiddleware(req, res, next) {
    console.log(`Request to ${req.originalUrl} came to app: ${process.argv[4]}`)
    const redisClient = await getRedisClient();

    switch(req.url) {
        case '/users':
            const reply = await redisClient.get('users').
                catch(err => console.log('error'))
            if (reply !== null) {
                res.send(reply)
                return console.log('response from redis!')
            }
            /** no data found in Redis, fetch from remote server */
            next()
            break
        case '/posts':
            try {
                const reply = await redisClient.get('posts')
                if (reply === null) {
                    /** no data found in Redis, fetch from remote server */
                    return next()
                }
                res.send(reply)
                console.log('response from redis!')
            } catch (err) {
                res.status(500).send('<h4> Something went wrong! </h4>') 
            }
            break
        case '/comments':
            try {
                const reply = await redisClient.get('comments'); 
                if (reply === null) {
                    /** no data found in Redis, fetch from remote server */
                    return next()
                }
                res.send(reply)
                return console.log('response from redis!')
            } catch (err) {
                res.status(500).send('<h4> Something went wrong! </h4>') 
            }
            break
    }
}

module.exports = redisMiddleware