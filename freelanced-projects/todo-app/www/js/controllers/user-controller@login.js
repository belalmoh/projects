/**
 * this is the controller of login page.
 * it takes username and password from the input.
 * after making a new object it use login, if the current records exist,
 * then the user is redirected to todo page,
 * otherwise the credentials are wrong.
 *
 * and if the user tried to get into the page with skipping login,
 * an alert message will be available over the body's page.
 *
 */

"use strict";
rootApp.controller('loginCtrl', function ($scope, $http, todoAlert) {
    $scope.setDB = function(){
        $http.get('initDb').then(function(response){
            console.log(response.data);
        });
    };
    
    $scope.setLogin = function (userName, password) {
        var u1 = new todoAlert.user(userName, password);
        u1.checkCredentials().then(function (response) {
            if (response.data.length == 0 ) {
                $scope.loginResponse = "Incorrect Credentials, signup if you don't own an account.";
            } else {
                u1.Name = response.data[0]["name"];
                u1.Pass = response.data[0]["pass"];
                u1.ID = response.data[0]["id"];


                u1.Login();
                u1.proceedToTodo();
            }

        });
    };
});