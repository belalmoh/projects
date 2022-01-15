import { createContext, useReducer } from "react";

const TodoContext = createContext();

const initialState = {
    todoList: []
};

const actions = {
    ADD_TODO_ITEM: "ADD_TODO_ITEM",
    REMOVE_TODO_ITEM: "REMOVE_TODO_ITEM",
    TOGGLE_COMPLETED: "TOGGLE_COMPLETED"
};

const todosReducer = (state, action) => {
    const {type, payload} = action;
    const {todoList} = state;

    switch(type) {
        case actions.ADD_TODO_ITEM:
            const {label, id} = payload;
            return {todoList: [...todoList, {label, id}]};

        case actions.REMOVE_TODO_ITEM:
            let filteredTodos = todoList.filter((todo) => todo.id !== payload.id);
            return {todoList: [...filteredTodos]};

        default:
            return state;
    }
}

const TodoProvider = ({children}) => {

    const [state, dispatch] = useReducer(todosReducer, initialState);

    const value = {
        todoList: state.todoList,
        addTodoItem: (label) => {
            dispatch({type: actions.ADD_TODO_ITEM, payload: {label, id: state.todoList.length+1}});
        },
        removeTodoItem: (id) => {
            dispatch({type: actions.REMOVE_TODO_ITEM, payload: {id}});
        }
    }

    return (
        <TodoContext.Provider value={value}>
            {children}
        </TodoContext.Provider>
    )
}

export {TodoContext, TodoProvider}
