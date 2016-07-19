"use strict";

let $ = require('jquery'),
  login = require("./user"),
  currentUser = require("./currentUser"),
  templates = require("./domBuild"),
  getWeather = require("./getWeather");

$("#auth-btn").click(function() {
  let user;
  login()
    .then(function(result) {
      user = result.user;
      currentUser.setUser(user.uid);
      templates.domBuild();
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
  let zip = $('#input').val();
  validateZip(zip)
    .then(function(data) {
      if (data) {
        getWeather(zip)
          .then(function(forecast) {
            templates.outputForecast(forecast);
          });
      } else {
        alert('Please use 5 digit zip');
      }
    });
});

$(document).on('keypress', '#input', (function(e) {
  let key = e.which,
    zip = $('#input').val();
  if (key == 13) // the enter key code
  {
    validateZip(zip)
      .then(function(data) {
        if (data) {
          getWeather(zip)
            .then(function(forecast) {
              templates.outputForecast(forecast);
            });
        } else {
          alert('Please use 5 digit zip');
        }
      });;
  }
}));

function validateZip(zip) {
  return new Promise(function(resolve, reject) {
    resolve(/^([0-9]{5})(?:[-\s]*([0-9]{4}))?$/.test(zip));
  });
}