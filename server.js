"use-strict";

//the express application
//removed Server(app)
const express = require('express'),
        app = express(),
        server = require('http');
        bodyParser = require('body-parser');
        cookieParser = require('cookie-parser');
        session = require('express-session');
        db = require('./server/model/sqlDB');
        routes = require('./server/routes/appRoutes')
        io = require('socket.io-client')(server);
        port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({secret: "hjt567"}));
routes(app);

// exports.start = function(cb) {
//   app.listen(port);
//   cb();
// }
app.listen(port);
var thisClient = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 19);
exports.thisClient;
// server.createServer(function (req, res) {
//   console.log("is here");
//   var thisClient = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 19);
//   console.log(thisClient);
//   res.cookie('clientId', thisClient);
//   res.status(200).json({success: 'success'});
// }).listen(port);




console.log("API Server started on: " + port);



//Connect
// var server = app.listen(process.env.PORT || 3306, function () {
//   var host = server.address().address
//   var port = server.address().exports
//
//   console.log("app listening at http://%s:%s", host, port)
// });

// var comp = "Metacognition and Life-Long Learning";
// var queryStr = "SELECT comp_id FROM DigitalCompetencies WHERE competencies = ?"
// db.query("SELECT comp_id FROM DigitalCompetencies WHERE competencies = ?", comp,
//            function(err, result){
//              if (err) throw err;
//              console.log(result);
//              var id = result[0].comp_id;
//             console.log("Server print: " + id);
//           });
