
$(function() {
  console.log('ready!')
});

$(window).on('load', function() {
  var i = 0;
  var temp_data = window.localStorage.getItem('data');
  var data_obj = JSON.parse(temp_data);
  for (var key in data_obj)
  {
    while (i < data_obj[key].length)
    {
      var this_table = document.getElementById(key);
      var this_body = this_table.getElementsByTagName('tbody');
      var this_row = this_body.item(0).insertRow(i);
      var cell1 = this_row.insertCell(0);
      var cell2 = this_row.insertCell(1);
      cell1.innerHTML = data_obj[key][i][0];
      cell2.innerHTML = data_obj[key][i][1];
      i += 1;
    }
    i = 0;
  }
});
