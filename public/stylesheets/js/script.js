console.log("Connected");
function myFunction() {
    var x = document.getElementById('grn_alert');
    var y = document.getElementById('widget-block');
    var z = document.getElementById('forecast');
    if (x.style.display === 'none' && y.style.display === 'none' && z.style.display === 'none')
    {
      x.style.display = 'block';
      y.style.display = 'block';
      z.style.display = 'block';
    } else {
      x.style.display = 'none';
      y.style.display = 'none';
      z.style.display = 'none';
    }
}
