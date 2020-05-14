const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'nothing',
    password: '265869',
    port: 5432,
})

module.exports = {
   pool
}