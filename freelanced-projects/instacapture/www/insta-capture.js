module.exports = {
  alert: function (title, message, buttonLabel, successCallback) {
    cordova.exec(successCallback,
      null, // No failure callback
      "InstaCapturePlugin",
      "alert", [title, message, buttonLabel]);
  },
  sayHi: function (successCallback, failureCallback) {
    cordova.exec(
      successCallback,
      failureCallback,
      "InstaCapturePlugin",
      "sayHi"
    );
  },
  sayHello: function (successCallback, failureCallback) {
    cordova.exec(
      successCallback,
      failureCallback,
      "InstaCapturePlugin",
      "sayHello"
    );
  },
  sayCongratulations: function (successCallback, failureCallback) {
    cordova.exec(
      successCallback,
      failureCallback,
      "InstaCapturePlugin",
      "sayCongratulations"
    );
  },
  Testing: function (successCallback, failureCallback) {
    cordova.exec(
      successCallback,
      failureCallback,
      "InstaCapturePlugin",
      "Testing"
    );
  }
};