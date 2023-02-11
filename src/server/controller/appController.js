"use strict";

//node only understands require not ES6 syntax import
var Application = require('../model/appModel.js');
const db = require('../model/sqlDB');
var async = require("async");

exports.post_new_application = function(req, res) {
  //console.log(req);
  var application = new Application(null, null, req.body.application, req.body.user);
  var i = 0;
  var queryList = [
    {queryString: "SELECT comp_id FROM DigitalCompetencies WHERE competencies = ?", var: req.body.competency},
    {queryString: "SELECT int_id FROM Interest WHERE interest = ?", var: req.body.interest},
  ];
 var promise = new Promise(function(resolve, reject){
     db.query(queryList[i].queryString, queryList[i].var, function(err, result){
                  if (err) reject(err);
                  else {
                    console.log(result);
                    i++;
                    resolve(result);
                  }
            });
 }).then(function(result){
   application.competency = result[0].comp_id;
   return new Promise(function(resolve, reject) {
     db.query(queryList[i].queryString, queryList[i].var, function(err, result){
                  if (err) reject(err);
                  else {
                    console.log(result);
                    i++;
                    resolve(result);
                  }
            });
   });
 }).then(function(result) {
   application.interest = result[0].int_id;
   application.newSQLEntry();
   res.status(200).json({success: 'success'});
 }).catch(function(result) {
   res.status(500).json({error: result});
   console.log(result);
 });
 }
