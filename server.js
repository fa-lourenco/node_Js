const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()

let apiKey = "8285d200513a2f35875b7f4e1ce3e66a";
let unitMeasure = "metric";

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index', {weather: null, error: null});
})

app.post('/', function (req, res) {
  let city = req.body.city;
  console.log(city);
  let url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unitMeasure}&appid=${apiKey}`;
  console.log(url);

  request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Error, please try again'});
    } else {
      let weather = JSON.parse(body)
      if(weather.message == undefined){
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
        let message = `It´s ${weather.list[0].main.temp} degrees in ${weather.city.name}!`;
        let tempArray = [];
        for (var i = 0; i < 6; i++) {
          tempArray[i]=weather.list[i].main.temp;
      }
        let tempDay1,tempDay2,tempDay3,tempDay4,tempDay5,tempDay6;
        console.log(tempArray[0]);
        res.render('index', {weather: message, error: null});
        res.render('index', {tempDay1: weather.list[1].main.temp, error: null});
        res.render('index', {tempDay2: weather.list[2].main.temp, error: null});
        res.render('index', {tempDay3: weather.list[3].main.temp, error: null});
        res.render('index', {tempDay4: weather.list[4].main.temp, error: null});
        res.render('index', {tempDay5: weather.list[5].main.temp, error: null});
        res.render('index', {tempDay6: weather.list[6].main.temp, error: null});
      }
    }
  });
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})