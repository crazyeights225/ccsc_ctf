var ctx = document.getElementById('boxchart');
box_stats = {"Fall 18": 0, "Summer 19":0}
var ctf_stats = {}
month_map = {"JAN": "Winter", "FEB": "Winter", "MAR": "Winter", "APR": "Winter", "MAY": "Summer", "JUN": "Summer", "JUL":"Summer", "AUG": "Summer", "SEPT": "Fall", 
"OCT": "Fall", "NOV": "Fall", "DEC": "Fall"}
var table = document.getElementById("boxlist");
var ctf_table = document.getElementById("ctflist");
for (var i = (table.rows.length)-1; i >= 1 ; i--) {
    row = table.rows[i];
    date_field = row.cells[4].innerHTML;
    if (date_field.split(" ")[0] in month_map){
      m = date_field.split(" ")[0]
      date_field = date_field.replace(m, month_map[m]);
    }
    if (!(date_field in box_stats)) {
      box_stats[date_field] =  0;
    }
    box_stats[date_field]++;
}
ctf_stats = JSON.parse(JSON.stringify(box_stats));
let setAll = (obj, val) => Object.keys(obj).forEach(k => obj[k] = val);
let setNull = obj => setAll(obj, 0);
setNull(ctf_stats);

for (var i = (ctf_table.rows.length)-1; i > 1 ; i--) {
    row = ctf_table.rows[i];
    date_field = row.cells[4].innerHTML;
    if (date_field.split(" ")[0] in month_map){
      m = date_field.split(" ")[0]
      date_field = date_field.replace(m, month_map[m]);
    }
    if (!(date_field in box_stats)) {
      ctf_stats[date_field] =  0;
    }
    ctf_stats[date_field]++;
}

config = {
  type: 'line',
  data: {
    labels:  Object.keys(box_stats),
    datasets: [{
      data: Object.values(box_stats),
      label: 'Number of Entries',
      backgroundColor: 'rgba(153, 102, 255, 0.2)',
			borderColor: 'rgba(153, 102, 255, 1)',
      fill: false
    },
    {
      data: Object.values(ctf_stats),
      label: 'Number of Entries (CTFs)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      fill: false
    }]
  }, options: {responsive: false}
}

var chart = new Chart(ctx, config);
chart.update();
