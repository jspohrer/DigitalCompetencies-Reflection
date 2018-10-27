//$(document).ready(function (){

  /**
  *   Opens the database
  */
  studentDB.open();
  console.log("I'm still running");

  /**
  *   Is called in the view to update the database
  *   Iterates through an array of userData DOM elements, creates data object,
  *   and passes object to the updateDB method of the database
  */
  function updateValues() {
    console.log('updateTest', studentDB.database);
    var data = document.querySelectorAll('.userData')
    for (var i=0; i < data.length; i++) {
      var name = data[i].querySelector('.nameOfskill').innerHTML;
      var usage = data[i].querySelector('.form-control').value;
      var interest = data[i].querySelector('.custom-select').value;

      var item = {
        name: name,
        usage: usage,
        interest: interest
      }
      studentDB.updateDB(item)
    }
    document.getElementById('updateDB').innerHTML = 'SUCCESS! Keep Reflecting'
  };

  /**
  *   Fills the summary page with the data in the database
  *   Calls the getDataByInterest method of the database to organize data according to interest
  *   summaryTable function is the callback that will be executed once the getDataByInterest method finishes executing
  */

  function fillSummaryTable() {
    console.log("This works", studentDB.database);
    studentDB.getDataByInterest(function(dataobjs) {
      var key;
      for (var i = 0; i < dataobjs.length; i++){
        for (key in dataobjs[i]) {
          var value = dataobjs[i][key];
          for (var j = 0; j < value.length; j++) {
            var this_table = document.getElementById(key);
            var this_body = this_table.getElementsByTagName('tbody');
            var this_row = this_body.insertRow();
            var cell1 = this_row.insertCell(0);
            var cell2 = this_row.insertCell(1);
            cell1.innerHTML = value.name;
            cell2.innerHTML = value.usage;
          }
        }
      }
    })
  };

//});
