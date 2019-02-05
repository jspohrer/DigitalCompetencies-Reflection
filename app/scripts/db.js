  var studentDB = (function() {
    var stdDB = {};
    var database = null;

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
/**
*   Open a connection to the student database
*   Takes a callback; a function that will be executed after the database is opened
*/

  stdDB.open = function(callback) {
    if(!window.indexedDB) {
      console.log("This browser does not support IndexedDB")
    }

    var version = 2;

    //open a connection to the database
    var request = indexedDB.open("studentDatabase", version);

    //Handle database upgrades
    request.onupgradeneeded = function(event) {
      var db = event.target.result;

      event.target.transaction.onerror = stdDB.onerror;

      if (!db.objectStoreNames.contains("studentData")) {
        var objectStore = db.createObjectStore("studentData", {keyPath: "name"})
        //create an index to search studentData by interest Level
        objectStore.createIndex("interest", "interest", {unique: false});
      }
      objectStore.transaction.oncomplete = function(event) {
        var studentDataObjectStore = db.transaction("studentData", "readwrite").objectStore("studentData")
        studentData.forEach(function(info) {
          studentDataObjectStore.add(info)
        });
      };
    };
    request.onsuccess = function(event) {
      database = event.target.result; //(request.result is an instance of the database)
      callback();
    };

    request.onerror = stdDB.onerror;
  };

  /**
  *   Updates sepcific data in the database
  *   Input: Obj (contains name of skill, usage and interest), callback function
  *   Output: Callback function
  */

  stdDB.updateDB = function(obj) {
    console.log("code doesn't get here");
    console.log(database);
    var db = database;
    console.log(db);
    var transaction = db.transaction('studentData', 'readwrite')
    var objectstr = transaction.objectStore('studentData')

    // var item = {
    //   name: obj.name,
    //   usage: obj.usage,
    //   interest: obj.interest
    // };
    var request = objectstr.put(obj);

    request.onsuccess = stdDB.onsuccess;
    request.onerror = stdDB.onerror;
  };

  /**
  * Reads data from the database using the interest Index
  * Currently not working
  */

  stdDB.getDataByInterest = function(callback) {
    var db = database;
    var transaction = db.transaction('studentData', 'readonly');
    var objectstr = transaction.objectStore('studentData');

    var dataObjs = [
      {"Neutral": []},
      {"Not at all Interested": []},
      {"Not Very Interested": []},
      {"Somewhat Interested": []},
      {"Very Interested": []},
    ];

    var interestIndex = objectstr.index("interest");
    interestIndex.openCursor().onsucess = function(event) {
      var cursor = event.target.result;
      console.log(cursor);
      if(cursor){
        console.log(cursor.key);
      }

      for (var i = 0; i < dataObjs.length; i++) {
        for (var key in dataObjs[i]) {
          console.log(cursor.key);
          console.log(cursor.value);
          if(cursor.key == dataObjs[i][key]) {
              dataObjs[i][key].push(cursor.value);
          cursor.continue();
          }
        }
      }
    }
    interestIndex.openCursor().onerror = stdDB.onerror;
    transaction.oncomplete = function(event) {
      callback(dataObjs);
    };
};

  /**
  *   Reads data from the database using main keypath; name
  *   This works
  */

  stdDB.getData = function(callback) {
    console.log("code doesn't get here")
    var db = database;
    var transaction = db.transaction('studentData', 'readonly');
    var objectstr = transaction.objectStore('studentData');

    var dataobjs = []

    var interestIndex = objectstr.index('interest');
    //var cursors = objectstr.openCursor()
    interestIndex.openCursor().onsuccess = function(event) {
      var cursor = event.target.result;
      if (cursor) {
        dataobjs.push(cursor.value);
        cursor.continue();
      }
    };

    transaction.oncomplete = function(event) {
      console.log(dataobjs);
      callback(dataobjs);
    };

    interestIndex.openCursor().onerror = stdDB.onerror;
  };

  //Export the database object
  return stdDB;
}());
