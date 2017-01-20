
/**
 * This enum is used for refering to the todo-status.
 * Enum is used because there might be any changes in the status in the future 
 * 
 * @enum {number}
 */
enum TodoStatus {
    notDone = 0,
    done = 1
}

class Todos {
    static lastId: number;
    private id: number;
    private name: string = "";
    private status: number;

    
    /**
     * Creates an instance of Todos.
     * 
     * @param {string} todoName
     * @param {((number | string))} todoStatus
     * @param {Function} response
     * 
     * @memberOf Todos
     */
    constructor(todoName: string, todoStatus: (number | string), response: Function) {
        this.name = todoName;
        if (TodoStatus[todoStatus] === undefined) {
            response("Error");
            this.status = TodoStatus.notDone;
        } else {
            response("Success");
            this.status = TodoStatus[todoStatus];
        }

        this.id = Todos.lastId;
        Todos.lastId+=1;
    }
}