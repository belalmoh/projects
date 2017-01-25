module.exports = {
  alert: function (title, message, buttonLabel, successCallback) {
    cordova.exec(successCallback,
      null, // No failure callback
      "Alert",
      "alert", [title, message, buttonLabel]);
  },
  sayHi: function (successCallback, failureCallback) {
    cordova.exec(
      successCallback,
      failureCallback,
      "Alert",
      "sayHi"
    );
  },
  sayHello: function (successCallback, failureCallback) {
    cordova.exec(
      successCallback,
      failureCallback,
      "Alert",
      "sayHello"
    );
  },
  sayCongratulations: function (successCallback, failureCallback) {
    cordova.exec(
      successCallback,
      failureCallback,
      "Alert",
      "sayCongratulations"
    );
  },
  Testing: function (successCallback, failureCallback) {
    cordova.exec(
      successCallback,
      failureCallback,
      "Alert",
      "Testing"
    );
  }
};