var express   = require("express"),
app           = express(),
request       = require("request"),
ejs           = require("ejs"),
bodyParser    = require("body-parser");


//requiring routes
var indexRoutes   = require("./routes/index");

app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", indexRoutes);

app.listen(process.env.PORT || 8080,function(){
  console.log("The Weather App server has started!");
});
