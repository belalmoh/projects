gymApp.controller('AppCtrl', function ($scope, $stateParams, User) {

  // // Form data for the login modal
  $scope.loginData = {
    userName: "",
    userPass: ""
  };

  $scope.isFailed = false;

  $scope.login = function() {
    var newUser = new User($scope.loginData.userName, $scope.loginData.userPass);
    newUser.login(function() {
        $scope.isFailed = true;
    });
  }

  window.addEventListener("keydown", function(event) {
    if(event.keyCode === 13){
      $scope.login();
    }
  }, true);
})