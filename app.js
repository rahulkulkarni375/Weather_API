 const { log } = require('console');
const express = require('express');
const https = require("https");
const app = express();
const port = 3000;

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended : true}));

app.get('/', (req, res) => { 

    res.sendFile(__dirname + "/index.html");
         
});

app.post('/', function (req, res) {

    const city = req.body.city;       //console.log(city);
    
    
    const url ="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=2abbc39a94a21304a435d266a7562597&units=metric";
   
    https.get(url,function(resp){
        console.log("The status code : "+resp.statusCode);
            resp.on("data",function(data){
                // console.log(data);  //This data will be in the hexdec format so will convert it into readable format
                
                const weatherData = JSON.parse(data);           console.log(weatherData);
                const des = weatherData.weather[0].description; //console.log(des);
                const w = weatherData.main.temp;                //console.log(w);
                const icon = weatherData.weather[0].icon;       //console.log(icon);
                const imgURL = "https://openweathermap.org/img/wn/"+icon+"@2x.png";
                
                res.write("<h1>The temperature in "+city+" is "+w+" degree celcius</h1>");
                res.write("<p>weather Description : "+ des +"</p>");
                res.write('<img src="'+imgURL+'" alt="">');
                res.send();
                //res.send("<h1>The temperature in dharwad is "+w+" degree celcius</h1><br><h2>weather Description : "+ des +"</h2>");  
        })
    })
    
})

app.listen(port, () => console.log(`Server Started!`));




/* 
200 : ok
404 : This comes when you made any typo errors like in the url you have typed "wether" instead of "weather"
401 : This comes when you made any errors in appid
*/