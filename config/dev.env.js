'use strict';
const merge = require('webpack-merge');
const prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    APP_BASE_URL: '"http://localhost:8080/"',
    APP_BASE_API: '"api/v1/"',
});
