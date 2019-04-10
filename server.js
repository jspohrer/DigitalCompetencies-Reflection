//the express application
const express = require('express'),
        app = express(),
        bodyParser = require('body-parser');
        db = require('./server/model/sqlDB');
        routes = require('./server/routes/appRoutes')
        port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
routes(app)

app.listen(port);

console.log("API Server started on: " + port);


//Connect
// var server = app.listen(process.env.PORT || 3306, function () {
//   var host = server.address().address
//   var port = server.address().exports
//
//   console.log("app listening at http://%s:%s", host, port)
// });

var comp = "Metacognition and Life-Long Learning";
db.query("SELECT comp_id FROM DigitalCompetencies WHERE competencies = ?", comp,
           function(err, result, fields){
             if (err) throw err;
             console.log(result);
             var id = result[0].comp_id;
            console.log("Server print: " + id);
          });
