///* 
//
// THIS IS UNUSED FILE. 
//
//
//
//
//
//
//
//
//
// * To change this license header, choose License Headers in Project Properties.
// * To change this template file, choose Tools | Templates
// * and open the template in the editor.
// */
//
///**
// * this is the static instance by which will be used along the program in
// * to verify the singleton pattern in login
// */
//
//user.myInstance = 0;
//
//
///**
// * this function proceed to todo page
// * and it sets the static instance with the current credentials.
// */
//user.prototype.proceedToTodo = function () {
//    "use strict";
//    // navigator.notification.alert("successfully registered.", function callBack(){}, "Congrats");
//    user.myInstance = this;
//    window.location.href = "#/todo";
//};
//
//
///**
// * this function takes todo_name and its time by which it should alert after,
// * and it push it to current logged user and registers it to his local storage.
// * @param {[string]} todo_name    [todo name]
// * @param {[time(s)]} timeInterval [time by which todo will alert]
// */
//user.prototype.addTODO = function (todo_name, timeInterval) {
//    "use strict";
//    if (this != undefined) {
//        this.todo.push(new todo());
//        this.todo[this.todo.length-1].name = todo_name;
//        this.todo[this.todo.length-1].timeOut = timeInterval;
//    } else
//        console.log("You should be logged on first!");
//};
//
//
///**
// * this function takes todo_name and delete it from both current
// * user's list and localstorage data if exists.
// * @param  {[string]} todo_name [todo name]
// */
//user.prototype.deleteTODO = function (todo_name) {
//    "use strict";
//    if (this != undefined) {
//        try {
//            var length = this.todo.length;
//
//            for (var i = 0; i < length; i++) {
//                if (todo_name == this.todo[i].name) {
//                    this.todo.splice(i, 1);
//                }
//            }
//        } catch (e) {
//            if (e instanceof TypeError) {
//
//            }
//        }
//
//    } else
//        console.log("You should be logged on first!");
//};
//
//
///**
// * this function takes todo_name and status,
// * it changes to either false(not checked) or true(checked)
// * @param  {[string]} todo_name [todo name]
// * @param  {[boolean]} status    [checked or not checked]
// */
//user.prototype.changeStatus = function (todo_name, status) {
//    "use strict";
//    if (this != undefined) {
//        try {
//            var length = this.todo.length;
//            for (var i = 0; i < length; i++) {
//                if (todo_name == this.todo[i].name) {
//                    this.todo[i].status = status;
//                }
//            }
//        } catch (e) {
//            if (e instanceof TypeError) {
//                console.log("Length is null");
//            }
//        }
//
//    } else
//        console.log("You should be logged on first!");
//};
//
//
///**
// * this function takes todo_name and return its status,
// * whether checked(true) or not checked(false)
// * @param  {[string]} todo_name [todo name]
// * @return {[boolean]} flag   [todo status (checked or not checked)]
// */
//user.prototype.getToDoStatus = function (todo_name) {
//    "use strict";
//    for (var i = 0; i < this.todo.length; i++) {
//        if (this.todo[i].name == todo_name) {
//            return this.todo[i].status;
//        }
//    }
//}
//
//
///**
// * this function login the current instance,
// * it binds the current instance with current logged in user so that
// * we can't have 2 logged in user at the same time.
// * @return {[boolean]} flag   [login status whether true or false]
// */
//todoAlert.User.Login = function(){
//    "use strict";
//    user.myInstance = this;
//};
//
///**
// * this logout function removes the current binding of my static instance
// * that is used during login. so when user logout he's redirected back to sign-in page
// */
//user.prototype.Logout = function () {
//    "use strict";
//    user.myInstance = 0;
//    window.location.href = "#/sign-in";
//}
//
///**
// * this function returns the current logged in instance,
// * if it's logged then it returns it, 
// * otherwise it returns 0
// * @return {[object of type user]} [current logged in instance]
// */
//user.getInstance = function () {
//    "use strict";
//    return user.myInstance;
//}