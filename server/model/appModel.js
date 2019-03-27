'user strict';

var db = require('./sqlDB')

function Application(compIndex, intIndex, usage) {
  this.comp_id      = competency;
  this.int_id       = interest;
  this.application  = usage;
};

  Application.create_new_app = function(comp, interest, usage, user) {
    this.application = usage;
    db.query("SELECT comp_id FROM DigitalCompetencies WHERE competencies=?", comp,
        function(err, res) {
          if (err) {
            console.log("error; ", err);
            result(err, null);
        }
        else {
          this.comp_id = result[0].comp_id;
        }
      });
    db.query("SELECT int_id FROM DigitalCompetencies WHERE interest =?", interest,
        function(err, res) {
          if (err) {
            console.log("error; ", err);
            result(err, null);
        }
        else {
          this.int_id = result[0].int_id;
        }
      });
    var application = [user, this.comp_id, this.int_id, this.application];
    db.query("INSERT INTO Usage VALUES ?", application, function(err, res) {
      if (err) {
        console.log("error; ", err)
        result(err, null);
      }
      else {
        console.log("Table updated");
      }
    });
  };

module.exports = Application;
