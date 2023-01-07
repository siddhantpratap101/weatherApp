const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {

    res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
    const query = req.body.cityName;
    const apikey = "42018aaf5082253655f3b6790580785d";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + unit + "&appid=" + apikey;
    https.get(url, function (response) {
        console.log(response.statusCode);

        response.on("data", function (data) {
            const weatherData = JSON.parse(data)

            const weatherTemp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const weatherIcon = weatherData.weather[0].icon;
            const imgURL = "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png"
            res.write("<h1>The temperature in " + query + " is " + weatherTemp + " degree celcius</h1>");
            res.write("<p>The weather is currently " + weatherDescription + "</p>");
            res.write("<img src=" + imgURL + ">");
            res.send();
        })


    })
})


app.listen(3000, function () {
    console.log("server is running on port 3000.");
})