const { Pool } = require('pg');

const pool = new Pool({
  port: 5432,
  user: 'postgres', // which will be connect to db
  password: 'root', // pass which we init when install psql, can set manual ALTER USER postgres WITH PASSWORD 'root';
  host: 'localhost',
  database: 'first_db' // name of local db
});

module.exports = pool;
