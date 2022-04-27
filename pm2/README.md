Useful commands:

```sh
pm2 ecosystem #creates a new pm2 config file
pm2 start ecosystem.config.js #reads ecosystem and start server(s)
pm2 monit #UI monitor for all threads
loadtest -n 3000 -c 100 --rps=100 #load testing with 3000 conections, 100 concurrent, and 100 request per minute
```