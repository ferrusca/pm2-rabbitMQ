## Nginx with pm2 and redis

### Nginx as load balancer and reverse proxy

For _nginx_ to act as both reverse-proxy and load balancer, uncomment `include jph-reverse-proxy-load-balancer.conf` line in `nginx.conf` file.

For _nginx_ to act only as reverse-proxy, uncomment `include jph-reverse-proxy.conf` line in `nginx.conf` file.

Create and start `node`, `redis` and `nginx` containers (note `node` container uses _pm2_ in order to create the cluster).

In `ecosystem.config,js` pm2 uses port `1234` to serve the application, so nginx has to proxy port `80` to the mentioned port. 

In `ecosystem.config,js`, pm2 ecosystem will deploy two instances of the same application (running in different ports), and nginx will proxy the request from port `80` to one of the two applications, acting as a reverse proxy and load balancer. 

```sh
docker-compose up -d
```

Then go to `localhost/jph/users`.