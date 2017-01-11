/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * this is the class definition of the todo.
 */

var todo = augment(baseClass, function (parent) {
    
    this.constructor = function () {
        this.id = 0;
        this.name = "";
        this.status = 0;
        this.timeOut = 0;
    };
});
