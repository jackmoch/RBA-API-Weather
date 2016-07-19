"use strict";

let $ = require('jquery');

function getConditions(zip) {
  return new Promise(function(resolve, reject) {
    $.ajax({
      url: `http://api.wunderground.com/api/cadf2ec036697adc/conditions/q/${zip}.json`
    }).done(function(conditions) {
      resolve(conditions.current_observation);
    })
  })
}

function getForecast(zip) {
  return new Promise(function(resolve, reject) {
    $.ajax({
      url: `http://api.wunderground.com/api/cadf2ec036697adc/forecast10day/q/${zip}.json`
    }).done(function(forecast) {
      resolve(forecast);
    })
  })
}

module.exports = {
  getConditions, getForecast
};