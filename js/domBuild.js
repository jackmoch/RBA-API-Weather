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

module.exports = domBuild;