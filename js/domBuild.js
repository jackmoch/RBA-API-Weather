"use strict";

let $ = require('jquery'),
  currentUser = require("./currentUser"),
  getSaved = require("./getSaved");

function domBuild() {
  $('#output').empty();
  let $initialDisplay =
    $(`
      <div>
        <input id="input" type="text" name="zip" placeholder="Input Zip"></input>
        <button id="submit-btn">Submit</button>
      </div>`);
  $(".uiContainer--wrapper").html($initialDisplay);
}

function outputConditions(conditions) {
  $('#output').empty();
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
  $('#output').empty();
  let $forecastWrapper = $("<div>", {
    id: "forecast-wrapper"
  });
  for (let i = 0; i < length; i++) {
    let currentForecast = forecastArray[i],
      $forecastListItem = $("<li>", {
        class: currentForecast.date.monthname + currentForecast.date.day
      }),
      $date = $("<span/>", {
        class: "forecast-date"
      }).text(currentForecast.date.monthname + " " + currentForecast.date.day),
      $forecastListData = $("<ul/>", {
        class: "forecast-list__item--data"
      }),
      $forcastSaveBtn = $("<button>", {
        id: currentForecast.date.monthname + currentForecast.date.day,
        class: "saveBtn"
      }).text("Save " + currentForecast.date.monthname + " " + currentForecast.date.day + " Forecast");

    $forecastListData.append(`
          <li>High Temp: ${currentForecast.high.fahrenheit}</li>
          <li>Low Temp: ${currentForecast.low.fahrenheit}</li>
          <li><img src="${currentForecast.icon_url}"></li>
          <li>Conditions: ${currentForecast.conditions}</li>
          `);
    $forecastWrapper.append($forecastListItem.append($date).append($forecastListData).append($forcastSaveBtn));
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

function outputFavorites() {
  let user = currentUser.getUser();
  let $savedWrapper = $("<div>", {
    id: "saved-wrapper"
  });
  getSaved(user)
    .then(function(forecastObject) {
      $('#output').empty();
      for (let forecast in forecastObject) {
        let currentForecast = forecastObject[forecast],
          $forecastListItem = $("<li>"),
          $date = $("<span/>", {
            class: "forecast-date"
          }).text(currentForecast.month + " " + currentForecast.day),
          $forecastListData = $("<ul/>"),
          $forecastDeleteBtn = $("<button>", {
            class: "deleteBtn",
            id: forecast
          }).text("Delete");

        $forecastListData.append(`
          <li>High Temp: ${currentForecast.high}</li>
          <li>Low Temp: ${currentForecast.low}</li>
          <li><img src="${currentForecast.conditionsIcon}"></li>
          <li>Forecast: ${currentForecast.conditions}</li>
          `);
        $savedWrapper.append($forecastListItem.append($date).append($forecastListData).append($forecastDeleteBtn));
      }
      $('#output').append($savedWrapper);
    });
}

module.exports = {
  domBuild, outputConditions, outputForecast, outputFavorites
};