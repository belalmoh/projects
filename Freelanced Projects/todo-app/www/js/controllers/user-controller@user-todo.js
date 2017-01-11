/**
 * this is the controller of todo page
 *
 */

"use strict";
rootApp.controller('listCtrl', function ($scope, $cordovaDialogs, todoAlert, $http, socket) {
    /**
     * this conditional part checks if there's any logged in instance or not
     */
    if (todoAlert.user.getInstance() == 0) {
        document.getElementsByTagName("body")[0].innerHTML = "STOP DAMAGING MY WEBSITE";
    } else {
        // var socket = io("http://localhost:3000");
        /**
         * binding the current logged in user by the current logged in from
         * static memory.
         *
         * getting his todo so that they'll be listed,
         * and getting his name that will be used in greeting part
         */


        myUserInstance = todoAlert.user.getInstance();

        /**
         * this is just for the sake of initialization. to use it correctly along the process.
         */
        anonymousInstance = new todoAlert.user('1234', '1234');

        var pageSignature = "";

        /**
         * checks the current url. if todo, then todo operations will run.
         * otherwise, anonymous opertions will run.
         *
         *  -assigning pageSignature
         *  -list todos
         *  -clear any interval that's running in the background
         *  -call alert function to check for timeouts
         */
        if (window.location.href.indexOf("todo") != -1) {
            console.log("You're now on todo page");
            pageSignature = "todo";
            myUserInstance.todo = todoAlert.listUserTodos(myUserInstance, pageSignature);
            $scope.names = myUserInstance.todo;
            todoAlert.clearCurrentIntervals();
            $scope.todoAlert = todoAlert.checkToDoAlert(myUserInstance, pageSignature);
        } else if (window.location.href.indexOf("anonymous") != -1) {
            console.log("You're now on anonymous page");
            pageSignature = "anonymous";
            anonymousInstance.todo = todoAlert.listUserTodos(anonymousInstance, pageSignature);
            $scope.names = anonymousInstance.todo;
            todoAlert.clearCurrentIntervals();
            $scope.todoAlert = todoAlert.checkToDoAlert(anonymousInstance, pageSignature);
        }

        $scope.loggedUser = myUserInstance.Name;


        /**
         * this checks the current selected todo,
         * in both list and changing status in storage and memory
         * if selected => true , else => false
         * @param {[string]} todoName [description]
         */
        $scope.setChecked = function (todoName) {

            $scope.$evalAsync(function () {
                if (pageSignature == "todo") {
                    if (myUserInstance.getToDoStatus(todoName)) {
                        myUserInstance.changeStatus(todoName, false, pageSignature);
                    } else {
                        myUserInstance.changeStatus(todoName, true, pageSignature);
                    }

                } else {
                    if (anonymousInstance.getToDoStatus(todoName)) {
                        socket.emit('check', {
                            todoName: todoName,
                            status: false,
                            signature: pageSignature
                        });
                    } else {
                        socket.emit('check', {
                            todoName: todoName,
                            status: true,
                            signature: pageSignature
                        });
                    }
                }
            });
        };


        /**
         * this logout the current logged in instance
         */
        $scope.Logout = function () {
            var message = "Do you want logout?";
            var title = "Logout";
            todoAlert.vibrateDevice();

            $cordovaDialogs.confirm(message, title, ['Yes', 'Stay'])
                .then(function (buttonIndex) {
                    // no button = 0, 'OK' = 1, 'Cancel' = 2
                    var btnIndex = buttonIndex;
                    if (btnIndex == 1) {
                        $scope.$evalAsync(function () {
                            myUserInstance.Logout();
                        });
                    }
                });

        }


        /**
         * this function deletes the current selected todo
         * @param  {[string]} todoName [todo name]
         */
        $scope.deleteToDo = function (todoName) {
            var message = "Do you want to delete it?";
            var title = "Todo Confirm Delete";
            todoAlert.vibrateDevice();

            $cordovaDialogs.confirm(message, title, ['Yes', 'No'])
                .then(function (buttonIndex) {
                    // no button = 0, 'OK' = 1, 'Cancel' = 2
                    var btnIndex = buttonIndex;
                    if (btnIndex == 1) {
                        $scope.$evalAsync(function () {
                            if (pageSignature == "todo")
                                myUserInstance.deleteTODO(todoName, pageSignature);
                            else {
                                socket.emit('delete', {
                                    todoName: todoName,
                                    signature: pageSignature
                                });
                            }
                        });
                    }
                });
        };

        /**
         * this function adds new todo by providing its name
         * and the time that you need to be notified after.
         */
        $scope.addToDo = function (todoName) {
            var message = "When would you like to be notified? [in seconds]. Leaving it empty means no notification";
            var title = "Todo Timer";

            todoAlert.vibrateDevice();

            $cordovaDialogs.prompt(message, title, ['Add', 'Cancle'])
                .then(function (result) {
                    var input = result.input1;
                    // no button = 0, 'OK' = 1, 'Cancel' = 2
                    var btnIndex = result.buttonIndex;

                    if (btnIndex == 1 && (isNaN(input) == 0)) {

                        if (pageSignature == "todo") {
                            myUserInstance.addTODO(todoName, Number(input));
                        } else {
                            socket.emit('add', {
                                todoName: todoName,
                                todoTime: Number(input),
                                signature: pageSignature
                            });
                        }

                        $http.post('addTodo', {
                            userId: JSON.stringify(todoAlert.user.getInstance().ID),
                            userName: JSON.stringify(todoAlert.user.getInstance().Name),
                            todoInfo: JSON.stringify({
                                "todoName": todoName,
                                "todoTimeOut": Number(input)
                            }),
                            flag: pageSignature
                        });
                        $scope.todoName = "";
                    }
                });
        };

        $scope.anonymously = function () {
            window.location.href = "#/anonymous";
        };

        $scope.loginPage = function () {
            window.location.href = "#/todo";
        }

        /**
         * this function returns the log from the database and posts it into logs.
         */
        $scope.viewLogs = function(){
            $http.get('getActivityLog').then(function(response){
                $scope.logs = response.data;
            });
        }

    }

});