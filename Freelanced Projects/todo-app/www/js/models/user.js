/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * this is the class definition of user.
 */
var user = augment(baseClass, function (parent) {

    this.constructor = function (name, pass) {
        this.Name = name;
        this.Pass = pass;
        this.ID = 0;
        this.todo = [];
        
    }
});
