//Dark Sky API key: b9dc6901023a8337df6a5c58be197ba0
//Google Maps API Key: AIzaSyBrwwwbvDLEEipFn_nr9sUtcVWqRugE2OA




var travelDate = "2019.03.25";

var unixTravelDate = moment(travelDate, 'YYYY.MM.DD').unix();
var destination = "london"; //hard coded destination until front end form is complete.
var coordinates
var formDestination;
var units;

var datePicker = function () {
  $('input[name="daterange"]').daterangepicker({
    opens: 'left'
  }, function (start, end, label) {
    console.log("A new date selection was made: " + start.format('MM-DD-YYYY') + ' to ' + end.format('YYYY-MM-DD'));
  });
}


var userInput = function () {
  var userName = $("#inputName").val();
  var userGender = $("#inputGender").val();
  var destination = $("#inputLocation").val();
  var dates = $("#inputDate").val();
  units = $("#inputUnits").val();

  console.log(userName);
  console.log(userGender);
  console.log(destination);
  console.log(dates);
  console.log(units);

}

$('#buttonSubmit').click(userInput);






var setWeather = function(){
  var proxy = 'https://cors-anywhere.herokuapp.com/'
$.ajax({
  url: `https://maps.googleapis.com/maps/api/geocode/json?address=${destination}&key=AIzaSyBQl-QMKAwNvWndyQcRfqlz39Ke6xZcb5w`,
  method: "Get"
}).then(function (results) {
  console.log(results);
  coordinates = results.results[0].geometry.location;
  formDestination = results.results[0].formatted_address;



  $.ajax({
    url: `${proxy}https://api.darksky.net/forecast/b9dc6901023a8337df6a5c58be197ba0/${coordinates.lat},${coordinates.lng},${unixTravelDate}?units=${units}&exclude=minutely,hourly,alerts,flags,currently`,
    headers: { 'Access-Control-Allow-Origin': '*' },
    method: "GET"
  }).then(function (results) {
    console.log($(results))
    var weatherData = results.daily.data[0];
    var unitsSign;
    if(units === "us"){
      unitsSign = "°F"
    }
    else(
      unitsSign = "°C"
    )
    $(
      `<div>Expected temperature range in ${formDestination} is going to be: <div>
            <div>High temperature: ${weatherData.temperatureHigh} ${unitsSign} </div>
            <div>Low Temperature: ${weatherData.temperatureLow} ${unitsSign} </div>`
    ).appendTo("#weather")

  });
})

}



$(document).ready(function () {
  datePicker();
});