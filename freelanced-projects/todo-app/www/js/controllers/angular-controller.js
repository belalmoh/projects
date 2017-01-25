/*
 * Created by belal on 6/22/16.
 */

/**
 * this is the user instance that will be used along the login time.
 */
var myUserInstance;

/**
 * this is the instance that's used with anonymous page.
 */
var anonymousInstance;

/**
 * this is the root app that is the main app of all pages.
 * and it has ngRoute specified so that we can use routing option
 * among all pages
 */
var rootApp = angular.module("rootApp", ["ngRoute", "ionic", "ui.router", "ngCordova"]);
"use strict";
rootApp.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when("/sign-in", {
            templateUrl: "sign-in.html",
            controller: "loginCtrl"
        })
        .when("/sign-up", {
            templateUrl: "sign-up.html",
            controller: "signUpCtrl"
        }).when("/todo", {
        templateUrl: "todo.html",
        controller: "listCtrl"
    }).when("/anonymous", {
        templateUrl: "anonymous.html",
        controller: "listCtrl"
    });

    $routeProvider
        .when("/", {
            templateUrl: "sign-in.html",
            controller: "loginCtrl as loginCtrl"
        });

    // $locationProvider.html5Mode(true);
});

// templateURL <- templateUrl
rootApp.factory('todoAlert', function ($http, $q) {

    /**
     * this function kills all running intervals.
     */
    var clearAllIntervals = function(){
        for (var i = 1; i < 99999; i++)
            window.clearInterval(i);
    };

    /**
     * this function returns the log from the database
     * @returns {HttpResponse} -> that will be used to show the log.
     */
    // var getActivityLog = function(){
    //     return $http.get('getActivityLog');
    // };

    /**
     * This function keeps decrementing each todo by 1 every second.
     * and it shows the alert if any todo has timeout 1.
     * @param {user} loggedUser -> current instance.
     */
    var checkAlert = function (loggedUser, pageSignature) {
        var timeoutInterval = function(){
            window.setInterval(function () {
                "use strict";
                /**
                 * this function counts by 1 second in the background and it keeps
                 * decrementing each todo-item of the logged on user, so that it alert
                 * him by todo when the time elapsed for each todo == 1 second
                 */
                try {
                    if (user.getInstance() != 0) {
                        for (var i = 0; i < loggedUser.todo.length; i++) {
                            if (loggedUser.todo[i].timeOut != 1 && loggedUser.todo[i].timeOut > 0) {
                                loggedUser.todo[i].timeOut -= 1;
                                $http.post('checkTimeout', {
                                    todo: JSON.stringify(loggedUser.todo[i].name),
                                    timeOut: JSON.stringify(loggedUser.todo[i].timeOut),
                                    userId: JSON.stringify(user.getInstance().ID),
                                    flag: pageSignature
                                }).then(function (response) {
                                    console.log(response.data);
                                });
                            } else if (loggedUser.todo[i].timeOut == 1) {
                                var message = (loggedUser.todo[i].name + " Should be done");
                                //                            navigator.notification.alert(message, function callBack() {
                                //                                todoAlert.vibrateDevice();
                                //                            }, "Todo Alert");

                                alert(message);

                                loggedUser.todo[i].timeOut = 0;
                                $http.post('checkTimeout', {
                                    todo: JSON.stringify(loggedUser.todo[i].name),
                                    timeOut: JSON.stringify(loggedUser.todo[i].timeOut),
                                    userId: JSON.stringify(user.getInstance().ID),
                                    flag: pageSignature
                                }).then(function (response) {
                                    console.log(response.data);
                                });
                                break;
                            }
                        }
                    }
                } catch (e) {
                    if (e instanceof TypeError) {

                    }
                }

            }, 1000);
        };
        timeoutInterval();
    };

    /**
     * this function takes the current logged instance and it keep tracking of its todo within the database
     * @param {logged instance} loggedUser
     * @returns {Array} todo list
     */
    var listUserTodos = function (loggedUser, pageSignature) {
        loggedUser.todo = [];
        $http.defaults.headers.post["Content-Type"] = "application/json";
        $http.post('listTodos', {
            userId: JSON.stringify(user.getInstance().ID),
            flag: pageSignature
        }).then(function (response) {
            for (var i = 0; i < response.data.length; i++) {
                loggedUser.todo[i] = new todo();
                loggedUser.todo[i].name = response.data[i].name;

                if (response.data[i].status == "1") {
                    loggedUser.todo[i].status = true;
                } else {
                    loggedUser.todo[i].status = false;
                }

                loggedUser.todo[i].id = response.data[i].id;
                loggedUser.todo[i].timeOut = response.data[i].timeOut;
            }
        });
        return loggedUser.todo;
    }

    var user = augment(baseClass, function (parent) {

        this.constructor = function (name, pass) {
            this.Name = name;
            this.Pass = pass;
            this.ID = 0;
            this.todo = [];

        };
        /**
         * this function registers this instance to the database if not exists
         * @returns {undefined}
         */

        this.signUp = function () {
            $http.defaults.headers.post["Content-Type"] = "application/json";
            return $http.post("userSignup", {
                serializedUser: JSON.stringify(this)
            });
        };

        /**
         * this function takes todo_name and its time by which it should alert after,
         * and it push it to current logged user and registers it to his local storage.
         * @param {[string]} todo_name    [todo name]
         * @param {[time(s)]} timeInterval [time by which todo will alert]
         */

        this.addTODO = function (todo_name, timeInterval) {
            "use strict";
            if (this != undefined) {
                if (this.todo.length == 0) {
                    this.todo.push(new todo());
                    this.todo[this.todo.length - 1].name = todo_name;
                    this.todo[this.todo.length - 1].timeOut = timeInterval;
                } else {
                    var duplicates = 0;
                    for (var i = 0; i < this.todo.length; i++) {
                        if (this.todo[i].name === todo_name) {
                            duplicates += 1;
                        }
                    }
                    if (duplicates == 0) {
                        this.todo.push(new todo());
                        this.todo[this.todo.length - 1].name = todo_name;
                        this.todo[this.todo.length - 1].timeOut = timeInterval;
                    } else {
                        // SHOULD BE CONVERTED TO CORDOVA DIALOGUE
                        alert("Duplicate values are not allowed");
                    }
                }
            } else
                console.log("You should be logged on first!");
        };

        /**
         * this function proceed to todo page
         * and it sets the static instance with the current credentials.
         */
        this.proceedToTodo = function () {
            "use strict";
            // navigator.notification.alert("successfully registered.", function callBack(){}, "Congrats");
            user.myInstance = this;
            window.location.href = "#/todo";
        };

        /**
         * this function takes todo_name, pageSignature and delete it from both current
         * user's list and database if exists.
         * then it checks pageSignature if todo, then it doesn't write in log.
         * otherwise, it writes in log bec you're in the unique room.
         * @param  {[string]} todo_name [todo name]
         */
        this.deleteTODO = function (todo_name, pageSignature) {
            "use strict";
            if (this != undefined) {
                try {
                    var length = this.todo.length;

                    for (var i = 0; i < length; i++) {
                        if (todo_name == this.todo[i].name) {
                            this.todo.splice(i, 1);
                            return $http.post('deleteTodo', {
                                userId: JSON.stringify(user.getInstance().ID),
                                userName: JSON.stringify(user.getInstance().Name),
                                todoInfo: JSON.stringify(todo_name),
                                flag: pageSignature
                            });
                        }
                    }
                } catch (e) {
                    if (e instanceof TypeError) {

                    }
                }

            } else
                console.log("You should be logged on first!");
        };


        /**
         * this function takes todo_name, pageSignatre and status,
         * it changes to either false(not checked) or true(checked) if pageSignature is todo.
         * otherwise, it writes in log bec you're in the unique room.
         * @param  {[string]} todo_name [todo name]
         * @param  {[boolean]} status    [checked or not checked]
         */
        this.changeStatus = function (todo_name, status, pageSignature) {
            "use strict";
            if (this != undefined) {
                try {
                    var length = this.todo.length;
                    for (var i = 0; i < length; i++) {
                        if (todo_name == this.todo[i].name) {
                            this.todo[i].status = status;
                            if (status == false)
                                return $http.put('changeStatus', {
                                    userId: JSON.stringify(user.getInstance().ID),
                                    userName: JSON.stringify(user.getInstance().Name),
                                    name: JSON.stringify(todo_name),
                                    status: JSON.stringify("0"),
                                    flag: pageSignature
                                });
                            else
                                return $http.put('changeStatus', {
                                    userId: JSON.stringify(user.getInstance().ID),
                                    userName: JSON.stringify(user.getInstance().Name),
                                    name: JSON.stringify(todo_name),
                                    status: JSON.stringify("1"),
                                    flag: pageSignature
                                });
                        }
                    }
                } catch (e) {
                    if (e instanceof TypeError) {
                        console.log("Length is null");
                    }
                }

            } else
                console.log("You should be logged on first!");
        };

        /**
         * this function takes todo_name and return its status,
         * whether checked(true) or not checked(false)
         * @param  {[string]} todo_name [todo name]
         * @return {[boolean]} flag   [todo status (checked or not checked)]
         */
        this.getToDoStatus = function (todo_name) {
            "use strict";
            for (var i = 0; i < this.todo.length; i++) {
                if (this.todo[i].name == todo_name) {
                    return this.todo[i].status;
                }
            }
        }

        /**
         * this function login the current instance,
         * it binds the current instance with current logged in user so that
         * we can't have 2 logged in user at the same time.
         * @return {[boolean]} flag   [login status whether true or false]
         */
        this.Login = function () {
            "use strict";
            user.myInstance = this;
        };

        /**
         * this logout function removes the current binding of my static instance
         * that is used during login. so when user logout he's redirected back to sign-in page
         */
        this.Logout = function () {
            "use strict";
            user.myInstance = 0;
            window.location.href = "#/sign-in";
        }

        /**
         * this function keeps tracking of the current instance username, password.
         * if found it returns its full details, otherwise it doesn't return anything.
         * @returns {object} if true.
         */
        this.checkCredentials = function () {
            $http.defaults.headers.post["Content-Type"] = "application/json";
            return $http.post("userLogin", {
                serializedUser: JSON.stringify(this)
            });
        }

    });

    user.myInstance = 0;
    /**
     * this function returns the current logged in instance,
     * if it's logged then it returns it,
     * otherwise it returns 0
     * @return {[object of type user]} [current logged in instance]
     */
    user.getInstance = function () {
        "use strict";
        return user.myInstance;
    }

    return {
        checkToDoAlert: checkAlert,
        vibrateDevice: function () {
            var time = 1000;
            navigator.vibrate(time);
        },
        listUserTodos: listUserTodos,
        user: user,
        clearCurrentIntervals : clearAllIntervals
    }
});

/**
 * this is socket factory model that'll be used during socket operations.
 */
rootApp.factory('socket', function ($rootScope, todoAlert) {
    var socket = io.connect();

    /**
     * responding to addTodo request. Then calling the add function that adds in both
     * memory and database.
     */
    socket.on('addTodo', function (data) {
        $rootScope.$apply(function () {
            anonymousInstance.addTODO(data.todoName, data.todoTime, data.signature);
        });
    });

    /**
     * responding to checkTodo request. Then calling the check function that checks todo in both
     * memory and database.
     */
    socket.on('checkTodo', function (data) {
        anonymousInstance.changeStatus(data.todoName, data.status, data.signature);
    });

    /**
     * responding to deleteTodo request. Then calling the delete function that deletes in both
     * memory and database.
     */
    socket.on('deleteTodo', function (data) {
        anonymousInstance.deleteTODO(data.todoName, data.signature);
    });

    // socket.on('getLog', function(data){
    //     todoAlert.getLog().then(function(response){
    //         log = response.data;
    //     })
    // });

    /**
     * most of the sockets operations that maybe or not used during sockets operation.
     */
    return {
        getSocket: function () {
            return socket;
        },
        remove: function (eventName) {
            socket.removeListener(eventName);
        },
        on: function (eventName, callback) {
            socket.on(eventName, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    callback.apply(socket, args);
                });
            });
        },
        emit: function (eventName, data, callback) {
            socket.emit(eventName, data, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    if (callback) {
                        callback.apply(socket, args);
                    }
                });
            })
        }
    }
});
