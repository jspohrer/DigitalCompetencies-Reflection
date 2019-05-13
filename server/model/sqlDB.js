'user strict';

var sqldatabase = require('mysql');

var pool = sqldatabase.createPool({
  connectionLimit : 20,
  host        : '67.205.172.52',
  user        : 'lgolohdi_user',
  password    : 'SebastianBachFugue#1',
  database    : 'lgolohdi_TestDatabase',
  port        : '3306'
});


module.exports = pool;
