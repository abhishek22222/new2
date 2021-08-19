const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const { request } = require("http");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
   
    res.sendFile(__dirname+"/index.html");
});
app.post("/",function(req,res){
    console.log("post recieved");
    const query = req.body.cityName;
const apiKey = "897aefdbeba4314739ab6a9eae9e9c44";
const unit = "metric";
const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;

https.get(url,function(response){
    console.log(response);
    response.on("data",function(data){
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const desc = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;  
        const imageurl = weatherData
        res.write("<h3>The weather is currently "+ desc+"</h3>");
        res.write("<h1>The Temperatur in "+query+" is "+temp+ " degree celcious.</h1>");
        res.send();
    })

})
});



app.listen(3000,function(){
    console.log("The server 300 have started");
});