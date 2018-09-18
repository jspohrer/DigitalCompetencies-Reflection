function getSelectedInterests() {
  var i;
  var temp_data = window.sessionStorage.getItem('data');
  var data_obj = JSON.parse(temp_data)
  //var x = document.getElementById("elecForm").value;
  var userInput = document.querySelectorAll('.userData');
  for (i = 0; i < userInput.length; i++) {
    //returns a static NodeList
    interestLevel = userInput[i].querySelectorAll('.custom-select');
    textinput = userInput[i].querySelectorAll('.form-control');
    skillname = userInput[i].querySelectorAll('.nameOfskill');
    for (var key in data_obj) {
      if (key == interestLevel[0].value){
        if (data_obj[key].length > 0) {
          var index = skillname.indexOf(skillname[0].innerHTML);
          for (var val in data_obj[key]){
            if (index in val){
              val[1] = textinput[0].value;
            }
            else {
              data_obj[key].push([skillname[0].innerHTML, textinput[0].value]);
            }
          }
        }
        else {
            data_obj[key].push([skillname[0].innerHTML, textinput[0].value]);
          }
       }
    }
    window.sessionStorage.setItem('data', JSON.stringify(data_obj));
   }
   //console.log(data_table["Very Interested"])
}
