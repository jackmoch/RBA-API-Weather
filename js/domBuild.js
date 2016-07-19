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

function outputForecast(forecastArray) {
  for (let forecast in forecastArray) {
    let currentForecast = forecastArray[forecast],
      $forecastListItem = $("<li>", {
        class: "forecast-list__item"
      }),
      $title = $("<span/>", {
        class: "forecast-title"
      }).text(currentForecast.title),
      $forecastListData = $("<ul/>", {
        class: "forecast-list__item--data"
      });

    $forecastListData.append(`
      <li>${currentForecast.fcttext}</li>
      <li>${currentForecast.fcttext_metric}</li>
      <li><img src="${currentForecast.icon_url}"></li>
      `);

    $('#output').append($forecastListItem.append($title).append($forecastListData));
    console.log("", forecastArray[forecast]);
  }
}

module.exports = {
  domBuild, outputForecast
};