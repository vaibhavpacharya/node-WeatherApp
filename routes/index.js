var express = require("express");
var router  = express.Router();
var request = require("request");
var moment  = require('moment');


var apiKey  = 'a74289eb1383fa0e57264af1b7f50051';

router.get("/", function(req,res){
  res.render("index",{
    weather: null,
    city: null,
    country: null,
    currTemp: null,
    tempLow: null,
    tempHigh: null,
    currWeather: null,
    currWind: null,
    currHumid: null,
    windShort: null,
    currPressure: null,
    currCloud: null,
    currCompass: null,
    currDegree: null,
    visibility: null,
    icon: null,
    code: null,
    time: null,
    sunrise: null,
    sunset: null});
});

router.post("/", function(req,res) {
  var city    = req.body.city;
  var url     = 'http://api.openweathermap.org/data/2.5/weather?q='+city+'&appid='+apiKey+'&units=metric';
  request(url, function(err,response,body){
    if(err){
      console.log(err);
      res.render("index", {weather: null, error: 'Error, please try again'});
    } else {
            var weather     = JSON.parse(body);
            console.log(weather);
            var currWeather = [];

            //current city
            currWeather['currCity']       = weather.name;
            //current country
            currWeather['currCountry']    = weather.sys.country;
            //current time and date
            currWeather['currTime']       = weather.dt;
            //Convert from UTC to GMT
            currWeather['currTime']       = moment.unix(currWeather['currTime']).format("DD-MM-YYYY HH:mm:ss");
            //sunrise
            currWeather['sunrise']        = weather.sys.sunrise;
            //Convert from UTC to GMT
            currWeather['sunrise']        = moment.unix(currWeather['sunrise']).format("HH:mm:ss");
            //sunset
            currWeather['sunset']        = weather.sys.sunset;
            //Convert from UTC to GMT
            currWeather['sunset']        = moment.unix(currWeather['sunset']).format("HH:mm:ss");
            //current temperature
            currWeather['currTemp']       = Math.round(weather.main.temp);
            // short text description (ie. rain, sunny, etc.)
            currWeather['description']		= weather.weather[0].description;
            // today's high temp
            currWeather['highTemp']       = Math.round(weather.main.temp_max);
            // today's low temp
  					currWeather['lowTemp']        = Math.round(weather.main.temp_min);
            // humidity (in percent)
  					currWeather['humidity']			  = Math.round(weather.main.humidity);
            //Visibility, meter
            currWeather['visibility']     = weather.visibility;
            // barometric pressure (converting hPa to inches)
  					currWeather['pressure']			  = weather.main.pressure * 0.02961339710085;
            // barometric pressure (rounded to 2 decimals)
  					currWeather['pressure']			  = currWeather['pressure'].toFixed(2);
            // 50x50 pixel png icon
  					currWeather['icon']				    = "http://openweathermap.org/img/w/"+weather.weather[0].icon+".png";
            //weather code
            currWeather['code']           = weather.weather[0].id;
            // cloud cover (in percent)
  					currWeather['cloudiness']		  = weather.clouds.all;
            // wind speed
  					currWeather['windSpeed']		  = Math.round(weather.wind.speed);
            // wind direction (in degrees)
  					currWeather['windDegree']		  = weather.wind.deg;
            // wind direction (compass value)
  					currWeather['windCompass']		= Math.round((currWeather['windDegree'] -11.25) / 22.5);

  					// array of direction (compass) names
  					var windNames                 = new Array("North","North Northeast","Northeast","East Northeast","East","East Southeast",
                                            "Southeast", "South Southeast","South","South Southwest","Southwest",
                                            "West Southwest","West","West Northwest","Northwest","North Northwest");
  					// array of abbreviated (compass) names
  					var windShortNames	          = new Array("N","NNE","NE","ENE","E","ESE", "SE", "SSE","S","SSW","SW","WSW","W","WNW","NW","NNW");
            // convert degrees and find wind direction name
  					currWeather['windDirection']	= windNames[currWeather['windCompass']];

            // current temperature
            var response = "Current Weather: "+currWeather['currTemp']+"\xB0 and "+currWeather['description'];
            if(currWeather['windSpeed']>0) {// if there's wind, add a wind description to the response
            response = response+" with winds out of the "+windShortNames[currWeather['windCompass']]+" at "+currWeather['windSpeed']+" miles per hour";
            }

            res.render("index", {
              weather: response,
              city: currWeather['currCity'],
              country: currWeather['currCountry'],
              currTemp: currWeather['currTemp']+"\xB0",
              tempLow:  currWeather['lowTemp']+"\xB0",
              tempHigh: currWeather['highTemp']+"\xB0",
              currWeather: currWeather['description'],
              currWind: currWeather['windSpeed'],
              currHumid: currWeather['humidity'],
              windShort: windShortNames[currWeather['windCompass']],
              currPressure: currWeather['pressure'],
              currCloud: currWeather['cloudiness'],
              currCompass: currWeather['windCompass'],
              currDegree: currWeather['windDegree'],
              visibility: currWeather['visibility'],
              icon: currWeather['icon'],
              time: currWeather['currTime'],
              code: currWeather['code'],
              sunrise: currWeather['sunrise'],
              sunset:  currWeather['sunset']
            });
        }
  });
});
module.exports = router;
