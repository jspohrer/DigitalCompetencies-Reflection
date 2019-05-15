"use-strict";

//the express application
//removed Server(app)
const express = require('express'),
        app = express(),
        server = require('http');
        path = require('path');
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
app.use(express.static(path.join(__dirname, '/public')))
app.use(express.static(path.join(__dirname, '/views')));

routes(app);

app.listen(port);

console.log("API Server started on: " + port);
