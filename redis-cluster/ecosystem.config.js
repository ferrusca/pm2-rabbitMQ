module.exports = {
  apps : [{
    name: 'EXPRESS REST api',
    script: 'server.js',
    instances: 'MAX',
    autorestart: true,
    exec_mode: 'cluster',
    max_memory_restart: '1G',
    watch: '.',
    env: {
      NODE_ENV: 'development',
      PORT: 1234
    }
  }],
};
