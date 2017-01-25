enum TodoStatus {
    notDone = 0,
    done = 1
}

class Todos {
    static lastId: number;
    private id: number;
    private name: string = "";
    private status: TodoStatus;


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