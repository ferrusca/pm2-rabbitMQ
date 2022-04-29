Two instances will be serving the application. Whenever a request is thrown, one of those instances will publish a message via **Redis** in order to the request to be acquired by any of the two workers which will be subscribed to a redis channel.

First, create and run `redis` container: 
```sh
docker-compose up -d
```

Then, start application instances with `pm2`, and run load test:
```sh
./node_modules/pm2/bin/pm2.js start
./node_modules/loadtest/bin/loadtest.js -n 1000 -c 100 --rps 100 http://localhost:3001\?number\=60
```