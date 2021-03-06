"use strict";

let $ = require('jquery'),
  login = require("./user"),
  currentUser = require("./currentUser"),
  templates = require("./domBuild"),
  getWeather = require("./getWeather"),
  zip = null,
  save = require("./saveForecastObject"),
  dbDelete = require('./dbDeleteForecast');

$("#auth-btn").click(function() {
  let user;
  login()
    .then(function(result) {
      user = result.user;
      currentUser.setUser(user.uid);
      templates.domBuild();
      $('#view-saved').attr('hidden', false);
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
});

$(document).on('click', '#submit-btn', function() {
  zip = $('#input').val();
  validateZip(zip)
    .then(function(data) {
      if (data) {
        getWeather.getConditions(zip)
          .then(function(conditions) {
            templates.outputConditions(conditions);
          });
      } else {
        alert('Please use 5 digit zip');
      }
    });
});

$(document).on('keypress', '#input', (function(e) {
  let key = e.which;
  zip = $('#input').val();
  if (key == 13) // the enter key code
  {
    validateZip(zip)
      .then(function(data) {
        if (data) {
          getWeather.getConditions(zip)
            .then(function(conditions) {
              templates.outputConditions(conditions);
            });
        } else {
          alert('Please use 5 digit zip');
        }
      });
  }
}));

function validateZip(zip) {
  return new Promise(function(resolve, reject) {
    resolve(/^([0-9]{5})(?:[-\s]*([0-9]{4}))?$/.test(zip));
  });
}

$(document).on('click', '#oneDayBtn', function() {
  getWeather.getForecast(zip)
    .then(function(forecast) {
      let forecastArray = forecast.forecast.simpleforecast.forecastday;
      templates.outputForecast(forecastArray, 1);
    });
});

$(document).on('click', '#threeDayBtn', function() {
  getWeather.getForecast(zip)
    .then(function(forecast) {
      let forecastArray = forecast.forecast.simpleforecast.forecastday;
      templates.outputForecast(forecastArray, 3);
    });
});

$(document).on('click', '#tenDayBtn', function() {
  getWeather.getForecast(zip)
    .then(function(forecast) {
      let forecastArray = forecast.forecast.simpleforecast.forecastday;
      templates.outputForecast(forecastArray, 10);
    });
});

$(document).on('click', '.saveBtn', function() {
  let day = $(this)[0].id;
  getWeather.getForecast(zip)
    .then(function(forecast) {
      let forecastArray = forecast.forecast.simpleforecast.forecastday;
      save(forecastArray, day);
    });
});

$(document).on('click', '#view-saved', function() {
  templates.outputFavorites();
});

$(document).on('click', '.deleteBtn', function() {
  let forecastId = $(this).attr('id');
  dbDelete(forecastId);
});