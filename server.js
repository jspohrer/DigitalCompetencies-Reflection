//the express application
const express = require('express'),
        app = express(),
        bodyParser = require('body-parser');
        db = require('./server/model/sqlDB');
        routes = require('./server/routes/appRoutes')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
routes(app)

//Connect
var server = app.listen(process.env.PORT || 3306, function () {
  var host = server.address().address
  var port = server.address().exports

  console.log("app listening at http://%s:%s", host, port)
});

var comp = "Metadata";
db.query("SELECT comp_id FROM DigitalCompetencies WHERE competencies = ?", comp,
          function(err, result, fields){
            if (err) throw err;
            var id = result[0].comp_id;
            console.log(id);
          });
