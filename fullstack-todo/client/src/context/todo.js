import { createContext, useReducer } from "react";

const TodoContext = createContext();

const initialState = {
    todos: new Map()
};

const ACTIONS = {
    ADD_TODO: "ADD_TODO",
    REMOVE_TODO: "REMOVE_TODO",
    TOGGLE_TODO: "TOGGLE_TODO"
}

const todoReducer = (state, action) => {
    const {type, payload} = action;
    const {todos} = state;

    switch(type) {
        case ACTIONS.ADD_TODO:
            var { id, name, isDone } = payload;
            todos.set(id, {id, name, isDone});
            return {...state};
        case ACTIONS.REMOVE_TODO:
            var { id } = payload;
            todos.delete(id);
            return {...state};
        case ACTIONS.TOGGLE_TODO:
            var { id } = payload;
            let currentTodo = todos.get(id);
            todos.set(id, {...currentTodo, isDone: !currentTodo.isDone});
            return {...state};
        default:
            return state;
    }
}

const TodoProvider = ({children}) => {
    const [state, dispatch] = useReducer(todoReducer, initialState);

    const value = {
        todos: Array.from(state.todos.values()),
        addTodo: (name, isDone = false) => {
            dispatch({type: ACTIONS.ADD_TODO, payload: {id: state.todos.size+1, name, isDone}});
        },
        deleteTodo: (id) => {
            dispatch({type: ACTIONS.REMOVE_TODO, payload: {id}});
        },
        toggleTodo: (id) => {
            dispatch({type: ACTIONS.TOGGLE_TODO, payload: {id}});
        }
    }

    return (
        <TodoContext.Provider value={value}>
            {children}
        </TodoContext.Provider>
    )
}

export {TodoContext, TodoProvider};