/**
 * this is the signup controller of signup page,
 * it takes the current input and it checks if the current record
 * exists in storage or not, if they don't, then user is registered
 */

"use strict";
rootApp.controller('signUpCtrl', function ($scope, $http, todoAlert) {
    $scope.signUp = function (userName, pass) {
        try {
            if (userName.length != undefined && pass.length != undefined &&
                    userName.length > 2 && pass.length > 2) {

                var newUser = new todoAlert.user(userName, pass);
                newUser.signUp().then(function(response){
                    if(response.data != "false"){
                        newUser.ID = response.data.insertId
                        newUser.proceedToTodo();
                    } else {
                        $scope.registeredLabel = "This user already exists, please choose another username!";
                        $scope.isRegistered = true;
                    }

                });



            } else {

                // navigator.notification.alert("length should be > 2 for both.", function callBack() {}, "Credentials Error");
                // todoAlert.vibrateDevice();

                $scope.registeredLabel = "length should be > 2 for both.";
                $scope.isRegistered = true;
            }
        } catch (e) {
            if (e instanceof TypeError) {

                // navigator.notification.alert("Both fields are required.", function callBack() {}, "Credentials Error");
                // todoAlert.vibrateDevice();
                $scope.registeredLabel = "Both fields are required.";
                $scope.isRegistered = true;
            }
        }
    }
});