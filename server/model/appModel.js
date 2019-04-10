'user strict';

const db = require('./sqlDB');

class Application {
  constructor(competency, interest, usage, user) {
    this.competency = competency;
    this.interest = interest;
    this.application = usage;
    this.user = user;
  }

 //application object method for creating a new sql entry
  newSQLEntry() {
    var comp_id;
    var int_id;
    console.log("Competency: " + this.competency);
    db.query("SELECT comp_id FROM DigitalCompetencies WHERE competencies = ?", this.competency,
               function(err, result, fields){
                 if (err) throw err;
                 //console.log(result);
                 comp_id = result[0].comp_id;
                 //console.log("Model print: " + comp_id);
               });
    db.query("SELECT int_id FROM Interest WHERE interest = ?", this.interest,
              function(err, result, fields){
                if (err) throw err;
                //console.log(result);
                int_id = result[0].int_id;
                //console.log("Model print: " + int_id);
              });
    //console.log("Application: " + this.application);
    //console.log("User: " + this.user);
    var application = ('1', this.user, comp_id, int_id, this.application);
    var sql = "INSERT INTO Applications (id, user_id, comp_id, int_id, applications) VALUES ? "
    db.query(sql, [application], function(err, result, fields){
                if (err) throw err;
                console.log(result);
                console.log("Table updated");
              });
            }
      }

module.exports = Application;
