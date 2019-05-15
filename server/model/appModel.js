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
    //console.log("comp_id: " + this.competency);
    //console.log("int_id: " + this.interest);
    var application = [this.user, this.competency, this.interest, this.application];
    var sql = "INSERT INTO Applications (user_id, comp_id, int_id, applications) VALUES (?,?,?,?) "
    db.query(sql, application, function(err, result){
                if (err) throw err;
                console.log(result);
                console.log("Table updated");
              });
            }
      }

module.exports = Application;
