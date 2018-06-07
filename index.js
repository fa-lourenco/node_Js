let request = require('request');
let argv = require ('yargs').argv;

let city = argv.c || "Lisbon,PT";
let apiKey = "8285d200513a2f35875b7f4e1ce3e66a";
let unitMeasure = "metric";
let url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unitMeasure}&appid=${apiKey}`;

console.log(url+"\n");

request(url, function(err, response, body){
    if (err){
        console.log('error: ', error);
    } else {
        let weatherData = JSON.parse(body);
        let message = `It´s ${weatherData.list[0].main.temp} degrees in ${weatherData.city.name}!`;
        console.log(message);
    }
});
