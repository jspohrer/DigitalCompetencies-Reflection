//Javascript object that will hold the data entered by the user
//Is indexed by the level of interest
//Will store an array of skills-input pairs
//global variable data_table

var data_table = {
  "Very Interested": [],
  "Somewhat Interested": [],
  "Neutral": [],
  "Not Very Interested": [],
  "Not at all interested": []
}

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
]

const dbName = "the_dataBase";
//local storage of window
var windowStorage = window.sessionStorage;
windowStorage.setItem('data', JSON.stringify(data_table))



class UserData {
  constructor(skillName, skillUsage, interestLevel) {
    this.skillName = skillName;
    this.skillUsage = skillUsage;
    this.interestLevel = interestLevel;
  }

  get_skilllName() {
    return this.skillName;
  }

  get_skillUsage() {
    return this.skillUsage;
  }

  get_interestLevel() {
    return this.interestLevel;
  }
}

//pageData is a list of UserData objects created on the page
class PageData {
  constructor(pageName, pageData) {
    this.pageName = pageName;
    this.pageData = pageData;
  }

  get_pageName() {
    return this.pageName;
  }

  get_pageData() {
    return this.pageData;
  }
}


function createlistOfDataObj(table) {
  var thispageUserData = [];
  // var table = document.querySelector('#digisurvivalMain')
  //get name of skill from the skill column of the table
  $(table).find('.userData').each(function(){
    var skillName = $(this).querySelector('.nameOfskill').html();
    console.log(skillName);
    // get the skillUsage and interest level information from the "How you use it & Lvl of interest column"
    var skillUsage = $(this).querySelector('.form-group, .form-control').val();
    var interesLevel = $(this).querySelector('.form-group, .custom-select').val();
    //creates an instance of UserData with the variables
    let userDataObj = new UserData(skillName, skillUsage, interestLevel);
    thispageUserData.push(userDataObj);
  })
    window.localStorage.setItem('digiSurvival', JSON.stringify(thispageUserData));
}
