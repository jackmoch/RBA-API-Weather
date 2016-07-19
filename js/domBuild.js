"use strict";

let $ = require('jquery');

function domBuild() {
  let $initialDisplay =
    $(`
      <div>
        <input id="input" type="text" name="zip" placeholder="Input Zip"></input>
        <button id="submit-btn">Submit</button>
      </div>`);
  $(".uiContainer--wrapper").html($initialDisplay);
}

function outputConditions(conditions) {
  let $conditionsListItem = $("<li>", {
      class: "conditions-list__item"
    }),
    $date = $("<span/>", {
      class: "conditions-date"
    }).text(conditions.observation_time),
    $conditionsListData = $("<ul/>", {
      class: "conditions-list__item--data"
    }),
    $oneDayForeCastBtn = $("<button>", {
      id: "oneDayBtn"
    }).text('One Day Forecast');

  $conditionsListData.append(`
    <li>Current Temp: ${conditions.temp_f} &#8457</li>
    <li>Current Weather: ${conditions.weather}</li>
    <li>Current Air Pressure: ${conditions.pressure_mb} mb</li>
    <li>Current Wind Speed: ${conditions.wind_mph} MPH</li>    
    `);

  $('#output').append($conditionsListItem.append($date).append($conditionsListData).append($oneDayForeCastBtn));
}

function outputForecast(forecastArray, length) {
  console.log("", forecastArray, length);
  let $forecastWrapper = $("<div>", {
    id: "forecast-wrapper"
  });
  for (let i = 0; i < length; i++) {
    console.log("test", forecastArray[i]);
    let currentForecast = forecastArray[i],
      $forecastListItem = $("<li>", {
        class: "forecast-list__item"
      }),
      $date = $("<span/>", {
        class: "forecast-date"
      }).text(currentForecast.date.weekday),
      $forecastListData = $("<ul/>", {
        class: "forecast-list__item--data"
      });

    $forecastListData.append(`
          <li>${currentForecast.high.fahrenheit}</li>
          <li>${currentForecast.low.fahrenheit}</li>
          <li><img src="${currentForecast.icon_url}"></li>
          <li>${currentForecast.conditions}</li>
          `);
    $forecastWrapper.append($forecastListItem.append($date).append($forecastListData));
  }
  if (length === 1) {
    let $threeDayForeCastBtn = $("<button>", {
      id: "threeDayBtn"
    }).text('Three Day Forecast');
    $('#output').append($forecastWrapper.append($threeDayForeCastBtn));
  } else if (length === 3) {
    let $tenDayForeCastBtn = $("<button>", {
      id: "tenDayBtn"
    }).text('Ten Day Forecast');
    $('#output').append($forecastWrapper.append($tenDayForeCastBtn));
  } else if (length === 10) {
    $('#output').append($forecastWrapper);
  }
}

module.exports = {
  domBuild, outputConditions, outputForecast
};