const config = require('../knexfile')

const env = process.env.NODE_ENV || 'development'

const pg = require('knex')(config[env]);

module.exports = pg
