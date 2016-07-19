"use strict";
let firebase = require("firebase/app");
let currentUser = {
  user: null
};

currentUser.getUser = function() {
  return currentUser.user;
};

currentUser.setUser = function(user) {
  currentUser.user = user;
};

module.exports = currentUser;