'user strict';

var sqldatabase = require('mysql');

var pool = sqldatabase.createPool({
  connectionLimit : 20,
  host        : '67.205.172.52',
  user        : 'jspohrer_dbadmin',
  password    : '_UgyPccD(,EQ',
  database    : 'jspohrer_digicompapp',
  port        : '3306'
});


module.exports = pool;
