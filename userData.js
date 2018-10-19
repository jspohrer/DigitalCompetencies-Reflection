db;

//studentData is an array of 19 objects
const studentData = [
  {name: "Networks and File Management", usage: "", interest: ""},
  {name: "Metacognition and Life-Long learning", usage: "", interest: ""},
  {name: "Troubleshooting", usage: "", interest: ""},
  {name: "Managing digital identity, privacy and security", usage: "", interest: ""},
  {name: "Strategic web and database searching", usage:"", interest: ""},
  {name: "Collaborative Communication", usage: "", interest: ""},
  {name: "Digital Writing and Publishing", usage: "", interest: ""},
  {name: "Audiovisual Analysis and Production", usage: "", interest: ""},
  {name: "Electronic data collection", usage: "", interest: ""},
  {name: "Privacy, Security and Preservation", usage: "", interest: ""},
  {name: "Cleaning, Organizing and Managing data", usage: "", interest: ""},
  {name: "Metadata", usage: "", interest: ""},
  {name: "Data Queries and Reporting", usage: "", interest: ""},
  {name: "Data Analysis", usage: "", interest: ""},
  {name: "Critical Data Visualization", usage: "", interest: ""},
  {name: "Algorithmic Thinking/Coding", usage: "", interest: ""},
  {name: "Design Thinking", usage: "", interest: ""},
  {name: "Project Management", usage: "", interest: ""},
  {name: "Digital Research and Scholarship", usage: "", interest: ""},
];

//Setting up the database

if(!window.indexedDB) {
  console.log("This browser does not support IndexedDB")
}

  var request = indexedDB.open("studentDatabase", 2);

  request.onupgradeneeded = function(event) {
    db = event.target.result;
    if (!db.objectStoreNames.contains("studentData")) {
      var objectStore = db.createObjectStore("studentData", {keyPath: "name"})
      //create an index to search studentData by interest Level
      objectStore.createIndex("interest", "interest", {unique: false});
    }
    //accessing the studentData object store through the transaction object.
    //transaction takes the store name and the mode
    objectStore.transaction.oncomplete = function(event) {
      var studentDataObjectStore = db.transaction("studentData", "readwrite").objectStore("studentData")
      studentData.forEach(function(info) {
        studentDataObjectStore.add(info)
      });
    };
  };

  request.onerror = function(event) {
    alert("Database error: " + event.target.errorCode)
  };

  request.onsuccess = function(event) {
    db = event.target.result; //(request.result is an instance of the database)
    console.dir(db.objectStoreNames);
    $('#updateDB').on('click', updateValues);
    // db.onerror = function(event) {
    //   alert("Database error: " + event.target.errorCode);
  };


//Updating the values in the database
  function updateValues() {
    var data = document.querySelectorAll('.userData')
    for (i=0; i < data.length; i++) {
      var name = data[i].querySelector('.nameOfskill').innerHTML;
      var usage = data[i].querySelector('.form-control').value;
      var interest = data[i].querySelector('.custom-select').value;

      var transaction = db.transaction('studentData', 'readwrite');
      var studentdta = transaction.objectStore('studentData');
      var item = {
        name: name,
        usage: usage,
        interest: interest
      }
      studentdta.put(item);

      request.onerror = function(e) {
        console.log("Error", e.target.error.name);
      }

      request.onsuccess = function(e) {
        console.log("It's in!");
      }
    }
    document.getElementById('updateDB').innerHTML = 'SUCCESS! Keep Reflecting'
  }

//filling the summary table
  function fillSummaryTable() {
    var transaction = db.transaction('studentData', 'readonly');
    var studentdta = transaction.objectStore('studentData');
    var interestLevels = studentdta.index("interest")

    var cursor = interestLevels.openCursor();

    cursor.onsuccess = function(e) {
      var cursor = e.target.result;
      if (cursor) {
        var this_table = document.getElementById(cursor.key);
        var this_body = this_table.getElementsByTagName('tbody');
        var this_row = this_body.insertRow();
        var cell1 = this_row.insertCell(0);
        var cell2 = this_row.insertCell(1);
        for (var field in cursor.value){
          if (field = "name") {
            cell1.innerHTML = cursor.value[field];
          }s
          if (field = "usage"){
            cell2.innerHTML = cursor.value[field];
          }
        }
      }
    }
    request.onsuccess = function(e) {
      console.log("We got it")
    }
    request.onerror = function(e) {
      console.log("We don't got it")
    }
  }
