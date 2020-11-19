var days = [];
var temperature = [];

var $ = function (id) {
  return document.getElementById(id);
};

window.onload = function () {
  $("displayResults").onclick = displayResults;
  $("addTemperature").onclick = addTemperature;
  $("displayTemperature").onclick = displayTemperature;
  $("Day").focus();
};

function displayResults() {
  var total = 0;
  var high, avg;
  var highDay;
  for (let i = 0; i < temperature.length; i++) {
    const temp = parseInt(temperature[i]);
    total = total + temp;
    if (high == null || temp > high) {
      high = temp;
      highDay = days[i];
    }
  }
  if (temperature.length != 0) {
    avg = total / temperature.length;
  }
  $("result").innerHTML = `<h2>Results</h2><p>The highest temperature was ${high}F on ${highDay}</p><p>Avgerage Temperature ${avg}F</p>`;
}

function displayTemperature() {
  $("tempResult").innerHTML = "<h2>Day-Temperature</h2>";
  $("temperature_table").innerHTML = `<tr><th>Day</th><th>Temp</th></tr>`;
  for (let i = 0; i < days.length; i++) {
    const day = days[i];
    const temp = temperature[i];
    $("temperature_table").firstChild.innerHTML += `<tr><td>${day}</td><td>${temp}</td></tr>`;
  }
}

function addTemperature() {
  var day = $("Day").value;
  var temp = parseInt($("Temperature").value);
  if (day == "" || day == null || day == "undefined" || isNaN(temp)) {
    alert("You must enter a day and a valid temperature.")
  }
  else {
    days.push(day);
    temperature.push(temp);
  }
  $("Day").focus();
}