const path = require('path');

module.exports = {
  name: 'green_focus prod',
  script: path.resolve(__dirname, './server/main.js'),
  exec_mode: 'cluster',
  instances: 2,
  merge_logs: true,
  log_type: 'json',
  env: {
    NODE_ENV: 'development',
  },
  env_production: {
    NODE_ENV: 'production',
  },
};
