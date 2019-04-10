"use strict";

//node only understands require not ES6 syntax import
var Application = require('../model/appModel.js');
//import Application from "../server/model/appModel.js";

exports.post_new_application = function(req, res) {
  console.log("req body in student post ", req.body)
  var competency = req.body.competency;
  var interest = req.body.interest;
  var usage = req.body.usage;
  var user = req.body.userid;
  
  var application = new Application(competency, interest, usage, user);
  console.log(application.competency);
  console.log(application.interest);
  console.log(application.usage);
  console.log(application.user);
  application.newSQLEntry();
}
