"use strict";

var Application = require('../model/appModel.js');

exports.post_new_application = function(req, res) {
  console.log("req body in student post ", req.body)
  let competency = req.body.competency;
  let interest = req.body.interest;
  let usage = req.body.usage;
  let user = req.body.userid;
  Application.ceate_new_app(competency, interest, usage, user);
}
