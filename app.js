var express   = require("express"),
app           = express(),
moment        = require('moment'),
request       = require("request"),
session       = require('express-session'),
bodyParser    = require("body-parser");


//requiring routes
var indexRoutes   = require("./routes/index");

app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));

// passport config
app.use(require("express-session")({
  secret: "This is Man Utd!",
  resave: false,
  saveUninitialized: false
}));

app.use("/", indexRoutes);

app.listen(process.env.PORT || 8080,function(){
  console.log("The Weather App server has started!");
});
