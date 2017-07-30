var express = require("express");
var router  = express.Router();
var request = require("request");

var apiKey  = 'a74289eb1383fa0e57264af1b7f50051';

router.get("/", function(req,res){
  res.render("index");
});

router.post("/", function(req, res) {
  var city    = req.body.city;
  var url     = 'http://api.openweathermap.org/data/2.5/weather?q='+city+'&appid='+apiKey+'&units=metric';

  request(url, function(err,response,body){
    if(err){
      console.log(err);
    } else {
            var weather = JSON.parse(body);
            if(weather.main == undefined){
            console.log(err);
          } else {
            var message = ("It's "+weather.main.temp+" degrees in " +weather.name);
            res.render("index", {message:message});
        }
      }
  });
});
module.exports = router;
