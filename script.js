//variables to alwasy send
  var key = "&appid=fa7d80c48643dfadde2cced1b1be6ca1";
  var system = "&units=imperial";

//send multiple requests with one event listner


document.getElementById("submit").addEventListener("click", function(event){
  //remove the legend title

  if (document.getElementById("formtit") != null){
    document.getElementById("formtit").remove();
}


  //delete after each refresh or submission
  //for current forecast
  for (i = 0; i < document.getElementById("results1").getElementsByTagName("span").length; i++) {
    document.getElementById("results1").getElementsByTagName("span")[i].innerHTML = "";
  }
  for (i = 0; i < document.getElementById("results1").getElementsByTagName("img").length; i++) {
    document.getElementById("results1").getElementsByTagName("img")[i].remove();
  }
  //for daily
  //

  for (i = 0; i < document.getElementById("results2").getElementsByTagName("span").length; i++) {
    document.getElementById("results2").getElementsByTagName("span")[i].innerHTML = "";
  }
  for (i = 0; i < document.getElementById("results2").getElementsByTagName("img").length; i++) {
    document.getElementById("results2").getElementsByTagName("img")[i].remove();
  }
  ///////5 day
//
//this stuff was pointless i dont know why i didn't just reset the contents in the table in teh first palce
/*  for (i = 0; i < document.getElementById("five").getElementsByTagName("tr").length; i++){
    document.getElementById("five").getElementsByTagName("tr")[i].remove();
  }
  for (i = 0; i < document.getElementById("five").getElementsByTagName("th").length; i++){
    document.getElementById("five").getElementsByTagName("th")[i].remove();
  }
  for (i = 0; i < document.getElementById("five").getElementsByTagName("td").length; i++){
    document.getElementById("five").getElementsByTagName("td")[i].remove();
  }
  for (i = 0; i < document.getElementById("five").getElementsByTagName("img").length; i++) {
    document.getElementById("five").getElementsByTagName("img")[i].remove();
  }
*/
  ////////////////////////
  /*
  for (i = 0; i < document.getElementById("map").getElementsByTagName("span").length; i++) {
    document.getElementById("map").getElementsByTagName("span")[i].innerHTML = "";
  }
*/
//this resets the table
//this is the right 5 day reset
var tablereset = document.getElementById("five");
tablereset.innerHTML = "";

//map reset
var mapreset = document.getElementById("mapid");
mapreset.innerHTML = "";

//lat and longitudue variables
  var lat = document.getElementById("lat").value;
  var long = document.getElementById("long").value;


  //variables for lat and long for the url
  var lats = "lat=" + lat;
  var longs = "&lon=" + long;
  // variables for lat and long for weather underground

  var clats = "centerlat=" + lat;
  var clongs = "&centerlon=" + long;
  //validation
    if (lat < -90 || lat > 90 || long < -180 || long > 180){
      alert("Invalid Coordinates");
      //window.history.back(); can't use back, gotta use refresh
      window.location.reload();
    }

    if (Number(lat) != lat || Number(long) != long){
      alert("Invalid Coordinates");
      //windows.history.back(); can't use back gotta use refresh
      window.location.reload();
    }


//current weather variables
  var url1 = "http://api.openweathermap.org/data/2.5/weather?";
//http://api.openweathermap.org/data/2.5/weather?lat=40.7128&long=74.0059&units=imperial&appid=fa7d80c48643dfadde2cced1b1be6ca1

//daily forestcast
  var url2  = "http://api.openweathermap.org/data/2.5/forecast/daily?";
  var cnt = "&cnt=1"; //1 day forecast varaible
//5 day forecast

  var url3 = "http://api.openweathermap.org/data/2.5/forecast?";
//map
//http://tile.openweathermap.org/map/{layer}/{z}/{x}/{y}.png?appid={api_key}
//layer names
//clouds_new, precipitation_new, pressure_new, wind_new, temp,new

var url4 = "http://tile.openweathermap.org/map/{layer}/{z}/{x}/{y}.png?appid={api_key}"
var key2 = "?appid=fa7d80c48643dfadde2cced1b1be6ca1"
//not using openweather map api, too hard to do, requires too many libraries and documentation is bad
//url for weather underground map
//GET http://api.wunderground.com/api/e1b776b01ebac720/feature/image.format?params
//key for weather underground
//moving this somewhere else so it does it after we get a valid url so im moving it to a different request
/*
var url5 = "http://api.wunderground.com/api/"
var url51 = "/radar/image.gif";
var key3 = "e1b776b01ebac720";
var end = "&radius=100&width=280&height=280&newmaps=1"
var z = "/18/" // amount of zoom default
// example: http://api.wunderground.com/api/e1b776b01ebac720/radar/image.gif?maxlat=42.35&maxlon=-109.311&minlat=39.27&minlon=-114.644&width=600&height=480&newmaps=1
//ex2: */





//icon stuff
/*    var iurl =   "http://openweathermap.org/img/w/" + response.list[0].weather[0].icon + ".png";
    var icon = document.createElement("img");
    icon.src = iurl;
    document.getElementById("results2").appendChild(icon);
*/



//5 day stuff
var req3 = new XMLHttpRequest();
req3.open("GET", url3 + lats + longs + system + key, true);
req3.addEventListener("load", function(){
  if (req3.status >= 200 && req3.status < 400){
    var response = JSON.parse(req3.responseText);




    for (var i = 0; i < response.list.length; i++) {
      var rows = document.createElement("tr");
      var rowid = i;
      rows.setAttribute("id", rowid);
//gotta create a table header in the javascript and not in the html
      if(rowid == 0){

          var rows1 = document.createElement("tr");


          var hd1 = document.createElement("th");
          hd1.innerHTML = "Date and Time";
          rows1.appendChild(hd1);

          //icon
          var hd11 = document.createElement("th");
          hd11.innerHTML = "Icon";
          rows1.appendChild(hd11);

          var hd2 = document.createElement("th");
          hd2.innerHTML = "Humidity (%)";
          rows1.appendChild(hd2);

          var hd3 = document.createElement("th");
          hd3.innerHTML = "Pressure (hPa)";
          rows1.appendChild(hd3);

          var hd4 = document.createElement("th");
          hd4.innerHTML = "Temperature(°F)";
          rows1.appendChild(hd4);

          var hd5 = document.createElement("th");
          hd5.innerHTML = "Max Temp(°F)";
          rows1.appendChild(hd5);

          var hd6 = document.createElement("th");
          hd6.innerHTML = "Min Temp(°F)";
          rows1.appendChild(hd6);

          var hd7 = document.createElement("th");
          hd7.innerHTML = "Rain in Last 3 hours(mm)";
          rows1.appendChild(hd7);

          var hd8 = document.createElement("th");
          hd8.innerHTML = "Description";
          rows1.appendChild(hd8);

          var hd9 = document.createElement("th");
          hd9.innerHTML = "Wind Speed(mph)";
          rows1.appendChild(hd9);

          var hd10 = document.createElement("th");
          hd10.innerHTML = "Wind Degree(°)";
          rows1.appendChild(hd10);

          var hd11 = document.createElement("th");
          hd11.innerHTML = "Cloud Coverage(%)";
          rows1.appendChild(hd11);


          document.getElementById("five").appendChild(rows1);
        }


      var time = document.createElement("td");
      time.innerHTML = response.list[i].dt_txt;
      rows.appendChild(time);


      var iurls =   "http://openweathermap.org/img/w/" + response.list[i].weather[0].icon + ".png";
      var icontd = document.createElement("td");
      var icons = document.createElement("img");
      icons.src = iurls
      icontd.appendChild(icons);
      rows.appendChild(icontd);



      var humidity = document.createElement("td");
      humidity.innerHTML = response.list[i].main.humidity;
      rows.appendChild(humidity);

      var pressure = document.createElement("td");
      pressure.innerHTML = response.list[i].main.pressure;
      rows.appendChild(pressure);

      var temp = document.createElement("td");
      temp.innerHTML = response.list[i].main.temp;
      rows.appendChild(temp);

      var temp_max = document.createElement("td");
      temp_max.innerHTML = response.list[i].main.temp_max;
      rows.appendChild(temp_max);

      var temp_min = document.createElement("td");
      temp_min.innerHTML = response.list[i].main.temp_min;
      rows.appendChild(temp_min);


      //rain doesn't pop if there is no rain
      if (response.list[i].rain['3h'] != null){

        var rain = document.createElement("td");
        rain.innerHTML = response.list[i].rain['3h'].toFixed(3);
        rows.appendChild(rain);
      }
      else{
        var rain = document.createElement("td");
        rain.innerHTML = "0" ;
        rows.appendChild(rain);
      }

      var description = document.createElement("td");
      description.innerHTML = response.list[i].weather[0].description;
      rows.appendChild(description);

      var windSpeed = document.createElement("td");
      windSpeed.innerHTML = response.list[i].wind.speed;
      rows.appendChild(windSpeed);
//in case wind degree doesn't show up
      if (response.list[i].wind.deg != null){
        var windDeg = document.createElement("td");
        windDeg.innerHTML = response.list[i].wind.deg;
        rows.appendChild(windDeg);
      }
      else{
        var windDeg = document.createElement("td");
        windDeg.innerHTML = "Unknown at this time";
        rows.appendChild(windDeg);
      }
      var clouds = document.createElement("td");
      clouds.innerHTML = response.list[i].clouds.all;
      rows.appendChild(clouds);

      document.getElementById("five").appendChild(rows);
    }


//icon stuff
/*    var iurl =   "http://openweathermap.org/img/w/" + response.list[0].weather[0].icon + ".png";
    var icon = document.createElement("img");
    icon.src = iurl;
    document.getElementById("results2").appendChild(icon);
*/
  }
  else{
    console.log("Error in network request: " + req1.statusText);
  }

})
req3.send(null);
event.preventDefault();

//daily stuff
  var req2 = new XMLHttpRequest();
  req2.open("GET", url2 + lats + longs + system + key + cnt, true);
  req2.addEventListener("load", function(){
    if (req2.status >= 200 && req2.status < 400){
      var response = JSON.parse(req2.responseText);
      //console.log(response);
      //again if the place is no where
      if (response.city.name == "Earth"){
        return; // have to use return because we already alerted and refreshed once and we're sending multi
        //requests at once
      }
      else{
      var iurl =   "http://openweathermap.org/img/w/" + response.list[0].weather[0].icon + ".png";
      var icon = document.createElement("img");
      icon.src = iurl;
      document.getElementById("results2").appendChild(icon);

      var weatherd = document.createElement("span");
      weatherd.innerHTML = "<br>" + "Description: " + response.list[0].weather[0].description + "<br /> <br />";
      document.getElementById("results2").appendChild(weatherd);
      //temperature stuff
      var daytemp = document.createElement("span");
      daytemp.innerHTML = "Day Temperature: " + response.list[0].temp.day + " °F" + "<br />";
      document.getElementById("results2").appendChild(daytemp);

      var mintemp = document.createElement("span");
      mintemp.innerHTML = "Minimum Daily Temperature: " + response.list[0].temp.min + " °F" + "<br />";
      document.getElementById("results2").appendChild(mintemp);

      var maxtemp = document.createElement("span");
      maxtemp.innerHTML = "Maximum Daily Temperature: " + response.list[0].temp.max + " °F" + "<br />";
      document.getElementById("results2").appendChild(maxtemp);

      var morntemp = document.createElement("span");
      morntemp.innerHTML = "Morning Temperature: " + response.list[0].temp.morn + " °F" + "<br />";
      document.getElementById("results2").appendChild(morntemp);

      var evetemp = document.createElement("span");
      evetemp.innerHTML = "Evening Temperature: " + response.list[0].temp.eve + " °F" + "<br />";
      document.getElementById("results2").appendChild(evetemp);

      var nighttemp = document.createElement("span");
      nighttemp.innerHTML = "Night Temperature: " + response.list[0].temp.night  + " °F" + "<br /><br />";
      document.getElementById("results2").appendChild(nighttemp);

      var humid = document.createElement("span");
      humid.innerHTML = "Humidity: " + response.list[0].humidity + "%" + "<br />";
      document.getElementById("results2").appendChild(humid);

      var press = document.createElement("span");
      press.innerHTML = "Pressure: " + response.list[0].pressure + " hPa" + "<br />";
      document.getElementById("results2").appendChild(press);
//wind degrees doesn't always show up
      var wind = document.createElement("span");
      if (response.list[0].deg != null){
        wind.innerHTML = "Wind Speed: " + response.list[0].speed + " mph " + "@ " + response.list[0].deg +  "°" + "<br />";
        document.getElementById("results2").appendChild(wind);

      }
      else{
        wind.innerHTML = "Wind Speed: " + response.list[0].speed + " mph " + "<br />";
        document.getElementById("results2").appendChild(wind);
      }

      //again rain doesn't allways show up
      if (response.list[0].rain != null){
        var rain = document.createElement("span");
        rain.innerHTML = "Rain Fall in Past 3 hours: " + response.list[0].rain + " mm" + "<br />";
        document.getElementById("results2").appendChild(rain);
      }


      var cloud = document.createElement("span");
      cloud.innerHTML = "Cloud Coverage: " + response.list[0].clouds + "%" + "<br />";
      document.getElementById("results2").appendChild(cloud);

}
    }
    else{
      console.log("Error in network request: " + req1.statusText);
    }

  })
  req2.send(null);
  event.preventDefault();


//current stuff
  var req1 = new XMLHttpRequest();
  req1.open("GET", url1 + lats + longs + system + key, true);
  req1.addEventListener("load", function(){
    if (req1.status >= 200 && req1.status < 400){
      var response = JSON.parse(req1.responseText);
      //console.log(response);

          //if latitutide and longitutude is not a valid place as in the middle of no where
        if (response.name == "Earth"){
          alert("Invalid Coordinates");
          //window.history.back(); can't use back gotta use refresh
          window.location.reload();
        }
        //else will wrap around everyting else
        else{


      //create the header for all the fields, just the name, country, latittude and longitude



      var formtit = document.createElement("legend");
      formtit.setAttribute("id", "formtit");
      formtit.innerHTML = "Forecast for " + response.name + ", " + response.sys.country + " @" + " Latitude: " + response.coord.lat + "°" + " Longtitude: " + response.coord.lon + "°";
      document.getElementById("place").appendChild(formtit);


      var iurl =   "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png";
      var icon = document.createElement("img");
      icon.src = iurl;
      document.getElementById("results1").appendChild(icon);

      var weatherd = document.createElement("span");
      weatherd.innerHTML = "<br>" + "Description: " + response.weather[0].description + "<br />";
      document.getElementById("results1").appendChild(weatherd);

      var temp = document.createElement("span");
      temp.innerHTML = "Temperature: " + response.main.temp + " °F" +"<br />"
      document.getElementById("results1").appendChild(temp);

      var min = document.createElement("span");
      min.innerHTML = "&nbsp &nbsp &nbsp &nbsp Minimum: " + response.main.temp_min + " °F" +"<br />"
      document.getElementById("results1").appendChild(min);

      var max = document.createElement("span");
      max.innerHTML = "&nbsp &nbsp &nbsp &nbsp Maximum: " + response.main.temp_max + " °F" +"<br />"
      document.getElementById("results1").appendChild(max);

      var humid = document.createElement("span");
      humid.innerHTML = "Humidity: " + response.main.humidity + "%" + "<br />";
      document.getElementById("results1").appendChild(humid);

      var press = document.createElement("span");
      press.innerHTML = "Pressure: " + response.main.pressure + " hPa" + "<br />";
      document.getElementById("results1").appendChild(press);
      //sometimes wind degree doesn't show up so doing this
      var wind = document.createElement("span");
      if (response.wind.deg != null){
        wind.innerHTML = "Wind Speed: " + response.wind.speed + " mph " + "@ " + response.wind.deg +  "°" + "<br />";
        document.getElementById("results1").appendChild(wind);

      }
      else{
        wind.innerHTML = "Wind Speed: " + response.wind.speed + " mph " + "<br />";
        document.getElementById("results1").appendChild(wind);
      }

      //rain doesn't get always get returned
      if (response.rain != null){
        var rain = document.createElement("span");
        rain.innerHTML = "Rain Fall in Past 3 hours: " + response.rain["3h"] + " mm" + "<br />";
        document.getElementById("results1").appendChild(rain);
      }

      var cloud = document.createElement("span");
      cloud.innerHTML = "Cloud Coverage: " + response.clouds.all + "%" + "<br />";
      document.getElementById("results1").appendChild(cloud);

//sunrise and sunset times are based where you are currently located
//so if you request the weather from new york for a town in japan, then the sunrise would be
//the time where you are located currently, so say we know sunrise is usually around 6am
//it'll be like 18:00 if you choose a town in japan.

//unix is a function that converts unix time to normal date time
//format is hour:minutes:seconds
      var sunrise = document.createElement("span");
      sunrise.innerHTML = "Sunrise: " + unix(response.sys.sunrise) + "<br>";
      document.getElementById("results1").appendChild(sunrise);

      var sunset = document.createElement("span");
      sunset.innerHTML = "Sunset: " + unix(response.sys.sunset);
      document.getElementById("results1").appendChild(sunset);
      //this is hte map stuff i put in one of the requests so it doens't just load a blank image if its invalid
      // variables for lat and long for weather underground map

      var clats = "centerlat=" + lat;
      var clong = "&centerlon=" + long;
      var url5 = "http://api.wunderground.com/api/"
      var url51 = "/radar/image.gif?";
      var key3 = "e1b776b01ebac720";
      var end = "&radius=20&width=600&height=480&newmaps=1";
      var z = "/18/"; // amount of zoom default
      // example: http://api.wunderground.com/api/e1b776b01ebac720/radar/image.gif?maxlat=42.35&maxlon=-109.311&minlat=39.27&minlon=-114.644&width=600&height=480&newmaps=1
      //ex2: http://api.wunderground.com/api/e1b776b01ebac720/radar/image.gif?centerlat=40.7128&centerlon=-74.0059&radius=20&width=600&height=480&newmaps=1
      var map = document.createElement("img");
      map.src = url5 + key3+ url51 + clats + clong + end;
      document.getElementById("mapid").appendChild(map);

      //we can't do alerts cause you apparently have to set that personally for what alerts you want and then you gotta wait and then will it send the proper
      //data to you back. so not implementing it

    }}
    else{
      console.log("Error in network request: " + req1.statusText);
    }

  })
  req1.send(null);
  event.preventDefault();
})


//sunrise and sunset returns unix time which most people didn't know how to read.
//function that returns normal time from unix time
function unix(t){
    var dt = new Date(t*1000);
    var hr = dt.getHours();
    var m = "0" + dt.getMinutes();
    var s = "0" + dt.getSeconds();
    return hr+ ':' + m.substr(-2) + ':' + s.substr(-2);
}

//convert logintidue and latitutde to tile form for the maps
