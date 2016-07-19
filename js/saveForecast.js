"use strict";

function saveForecast(forecastArray, day) {
  for (let forecast in forecastArray) {
    let currentForecast = forecastArray[forecast];
    if (day === currentForecast.date.monthname + currentForecast.date.day) {
      let savedForecast = {
        high: currentForecast.high.fahrenheit,
        low: currentForecast.low.fahrenheit,
        conditionsIcon: currentForecast.icon_url,
        conditions: currentForecast.conditions
      }
      console.log(savedForecast);
    }
  }
}

module.exports = saveForecast;