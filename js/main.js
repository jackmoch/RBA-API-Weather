"use strict";

let $ = require('jquery'),
  login = require("./user"),
  currentUser = require("./currentUser"),
  templates = require("./domBuild");

$("#auth-btn").click(function() {
  let user;
  login()
    .then(function(result) {
      user = result.user;
      currentUser.setUser(user.uid);
      templates();
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
  validateZip($('#input').val())
    .then(function(data) {
      if (data) {
        //run next function
      } else {
        alert('Please use 5 digit zip');
      }
    });
});

$(document).on('keypress', '#input', (function(e) {
  var key = e.which;
  if (key == 13) // the enter key code
  {
    validateZip($('#input').val())
      .then(function(data) {
        if (data) {
          //run next function
        } else {
          alert('Please use 5 digit zip');
        }
      });;
  }
}));

function validateZip(zip) {
  console.log("test");
  return new Promise(function(resolve, reject) {
    resolve(/^([0-9]{5})(?:[-\s]*([0-9]{4}))?$/.test(zip));
  });
}