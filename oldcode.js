function saveUserData() {
  $table.find("thead th").each(function () {
      header.push($(this).html());
  });
  console.log(header);

  $table.find('.nameOfskill').each(function () {
    skills.push($(this).html());
  })
  console.log(skills);

  // stores data entered for a specific row into the user_data array
  //and stores that array in the allUserData array
  $table.find('tbody tr.userData').each(function (){
    var user_data = [];
    this.find('.form-group').(function() {
       user_data.push($(this).find('.form-control').val());
       user_data.push($(this).find('.custom-select').val());
    allUserData.push(user_data);
    })  })
  $table.find("tbody tr").each(function () {
     var row = {};

     $(this).find("td").each(function (i) {
         var key = header[0],
             value = skills[i];
         row[key] = value;
         key = header[2];
         value = allUserData[i];
         row[key] = value;
     });

     rows.push(row);
 })
 console.log(rows);
 window.sessionStorage.setItem('data2', JSON.stringify(user_data));
 console.log(var data = sessionStorage.getItem('data2'))
}
