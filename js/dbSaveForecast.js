"use strict";

let fb = require('./fb-getter'),
  fbData = fb(),
  $ = require('jquery');

function saveForecast(forecastObject) {
  return new Promise(function(resolve, reject) {
    $.ajax({
      url: `${fbData.url}/forecasts.json`,
      method: "POST",
      data: JSON.stringify(forecastObject),
      dataType: 'json'
    }).done(function(test) {
      resolve(test);
    });
  });
}

module.exports = saveForecast;