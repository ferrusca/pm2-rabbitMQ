Since pm2 internally manages the processes and distribute the incomming connections, we cannot longer use `cluster` module. Therefore we need to use a message broker such as **RabbitMQ**. RabbitMQ will be deployed in a container to avoid local installations. Only package needed is `amqplib` which will be used to connect to RabbitMQ server. It can be installed via NPM.

Start RabbitMQ environment:
```sh
docker-compose up -d
```

Start indicating configuration server file:
```sh
pm2 start ecosystem.config.ts
pm2 monit
```

Access to `http://localhost:15672` interface in order to see queues and messages. Note that messages will not be stored al least one worker (consumer) stops working. In that case messages will be persisted in the queue.

Finally, to test with multiple requests:
```sh
./node_modules/loadtest/bin/loadtest.js -n 1000 -c 100 --rps 100 http://localhost:3001\?number=20
```