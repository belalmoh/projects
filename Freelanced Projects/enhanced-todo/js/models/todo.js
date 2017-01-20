/**
 * This enum is used for refering to the todo-status.
 * Enum is used because there might be any changes in the status in the future
 *
 * @enum {number}
 */
var TodoStatus;
(function (TodoStatus) {
    TodoStatus[TodoStatus["notDone"] = 0] = "notDone";
    TodoStatus[TodoStatus["done"] = 1] = "done";
})(TodoStatus || (TodoStatus = {}));
var Todos = (function () {
    /**
     * Creates an instance of Todos.
     *
     * @param {string} todoName
     * @param {((number | string))} todoStatus
     * @param {Function} response
     *
     * @memberOf Todos
     */
    function Todos(todoName, todoStatus, response) {
        this.name = "";
        this.name = todoName;
        if (TodoStatus[todoStatus] === undefined) {
            response("Error");
            this.status = TodoStatus.notDone;
        }
        else {
            response("Success");
            this.status = TodoStatus[todoStatus];
        }
        this.id = Todos.lastId;
        Todos.lastId += 1;
    }
    return Todos;
}());
