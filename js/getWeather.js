"use strict";

let $ = require('jquery');

function getWeather(zip) {
  return new Promise(function(resolve, reject) {
    $.ajax({
      url: `http://api.wunderground.com/api/cadf2ec036697adc/forecast/q/${zip}.json`
    }).done(function(forecast) {
      resolve(forecast.forecast.txt_forecast.forecastday);
    })
  })
}

module.exports = getWeather;