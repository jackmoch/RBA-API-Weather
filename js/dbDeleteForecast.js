"use strict";

let fb = require('./fb-getter'),
  fbData = fb(),
  $ = require('jquery'),
  templates = require('./domBuild.js');

function deleteForecast(forecastId) {
  return new Promise(function(resolve, reject) {
    $.ajax({
      url: `${fbData.url}/forecasts/${forecastId}.json`,
      method: "DELETE",
    }).done(function(test) {
      templates.outputFavorites();
      resolve(test);
    });
  });
};

module.exports = deleteForecast;