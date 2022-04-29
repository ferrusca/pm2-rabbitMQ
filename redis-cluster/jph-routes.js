const express = require('express');
const redis = require('redis');

const config = require('./middleware/config')
const redisMiddleware = require('./middleware/redis-middleware');

const usersApi = require('./jsonplaceholder/users-api');
const postsApi = require('./jsonplaceholder/posts-api');
const commentsApi = require('./jsonplaceholder/comments-api');

const router = express.Router();

router.use(redisMiddleware);

async function connectRedis() {
    const client = redis.createClient({
        host: config.redisHost,
        port: config.redisPort,
    });
    await client.connect()
    return client;
}


router.get('/users', async (request, response) => {
    const redisClient = await connectRedis();
    usersApi.fetchUsers().then(
        data => data.json(),
        error => Promise.reject(error)
    ).then(
        users => {
            console.log(`Data fetched from server by process with PID: ${process.pid}`)
            /** storing fetched data in redis server */
            redisClient.set('users', JSON.stringify(users));
            response.send(users)
        },
        reason => response.status(500).send(reason)
     )
});

router.get('/posts', async (request, response) => {
    const redisClient = await connectRedis();
    postsApi.fetchPosts().then(
        data => data.json(),
        error => Promise.reject(error)
    ).then(
        posts => {
            console.log(`Data fetched from server by process with PID: ${process.pid}`)
            /** storing fetched data in redis server */
            redisClient.set('posts', JSON.stringify(posts));
            response.send(posts)
        },
        reason => response.status(500).send(reason)
     )
});

router.get('/comments', async (request, response) => {
    const redisClient = await connectRedis();
    commentsApi.fetchComments().then(
        data => data.json(),
        error => Promise.reject(error)
    ).then(
        comments => {
            console.log(`Data fetched from server by process with PID: ${process.pid}`)
            /** storing fetched data in redis server */
            redisClient.set('comments', JSON.stringify(comments));
            response.send(comments)
        },
        reason => response.status(500).send(reason)
    )
});

module.exports = router