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
