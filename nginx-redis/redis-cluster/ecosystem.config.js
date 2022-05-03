// two instances of the application, with args to differentiate them
module.exports = {
  apps : [{
    name: 'EXPRESS REST api',
    script: 'server.js',
    args: 'Application 1!',
    instances: '1',
    autorestart: true,
    exec_mode: 'cluster',
    max_memory_restart: '1G',
    watch: '.',
    env: {
      NODE_ENV: 'development',
      PORT: 3001
    }
  },
  {
    name: 'EXPRESS REST api',
    script: 'server.js',
    args: 'Application 2!',
    instances: '1',
    autorestart: true,
    exec_mode: 'cluster',
    max_memory_restart: '1G',
    watch: '.',
    env: {
      NODE_ENV: 'development',
      PORT: 3002
    }
  }],
};
