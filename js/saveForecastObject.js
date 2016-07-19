"use strict";

let currentUser = require("./currentUser"),
  dbSave = require("./dbSaveForecast");

function saveForecastObject(forecastArray, day) {
  let user = currentUser.getUser();
  for (let forecast in forecastArray) {
    let currentForecast = forecastArray[forecast];
    if (day === currentForecast.date.monthname + currentForecast.date.day) {
      let savedForecast = {
        high: currentForecast.high.fahrenheit,
        low: currentForecast.low.fahrenheit,
        conditionsIcon: currentForecast.icon_url,
        conditions: currentForecast.conditions,
        uid: user
      };
      dbSave(savedForecast)
    }
  }
}

module.exports = saveForecastObject;