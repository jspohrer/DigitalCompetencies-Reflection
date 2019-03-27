'user strict';

var sqldatabase = require('mysql');

var connection = sqldatabase.createConnection({
  host        : '67.205.172.52',
  user        : 'lgolohdi_user',
  password    : 'SebastianBachFugue#1',
  database    : 'lgolohdi_TestDatabase',
  port        : '3306'
});

connection.connect(function(err) {
  if (err) throw err;
});

// connection.query("SELECT * FROM DigitalCompetencies WHERE comp_id = 5",
//           function(err, result, fields){
//             if (err) throw err;
//             console.log(result);
//           });

//console.log("checking connection...")
module.exports = connection;
