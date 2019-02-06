  /**
  *   Is called in the view to update the database
  *   Iterates through an array of userData DOM elements, creates data object,
  *   and passes object to the updateDB method of the database
  */


  function updateValues() {
    studentDB.open(update);
  };

  function update() {
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

  function generateSummary() {
    studentDB.open(fillSummaryTable);
  }

  function fillSummaryTable() {

    var dataObjs = [
      {"Somewhat Interested": []},
      {"Very Interested": []},
      {"Neutral": []},
      {"Not Very Interested": []},
      {"Not at all Interested": []},
    ];

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

  function cellLineBreakStyle(cell) {
    var cellStyle = document.createElement("STYLE");
    cell.appendChild(cellStyle);
    cell.style.wordWrap = "normal";
    cell.style.fontFamily = "Raleway, sans-serif";
  };

  function cellFontStyle(cell) {
    var style = document.createElement("STYLE");
    cell.appendChild(style);
    cell.style.fontSize = "x-large";
    cell.style.fontFamily = "Raleway, sans-serif";
    cell.style.fontStyle = "italic";
  }

  function addRow(obj, tableID) {
    var this_table = document.getElementById(tableID);
    var this_row = this_table.insertRow();
    var cell1 = this_row.insertCell(0);
    cellFontStyle(cell1);
    var cell2 = this_row.insertCell(1);
    cellLineBreakStyle(cell2);
    cell1.innerHTML = obj.name;
    cell2.innerHTML = obj.usage;
  };

  function getAll() {
    studentDB.open(all)
  };

  function all() {
    var dataobjs = [];
    var j = 0;
    studentDB.getData(function(dataobjs) {
      for (var i = 0; i < dataobjs.length; i++) {
        var obj = dataobjs[i];
        if (obj.interest != "Choose..." && obj.interest != "") {
          addRow(obj, obj.interest);
        }
      }
    });
  };

  function printToPDF() {
    var summaryPDF = "YourResults.pdf";
    var quality = 2
    html2canvas(document.querySelector("#convertTopdf"), {scale: quality}).then(canvas => {
      let pdf = new jsPDF('p', 'mm', 'a4');
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 211, 298);
      pdf.save(summaryPDF);
    });
  }
