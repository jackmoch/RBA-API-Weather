"use strict";

let fb = require('./fb-getter'),
  fbData = fb(),
  $ = require('jquery');

function getSaved(userId) {
  return new Promise(function(resolve, reject) {
    $.ajax({
      url: `${fbData.url}/forecasts.json?orderBy="uid"&equalTo="${userId}"`
    }).done(function(data) {
      resolve(data);
    });
  });
}

module.exports = getSaved;