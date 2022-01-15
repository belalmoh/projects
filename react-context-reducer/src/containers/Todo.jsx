import React, { useContext, useState } from "react";

import { TodoContext, TodoProvider } from "../contexts/todo-context";

const Todo = () => {
    const { todoList, addTodoItem, removeTodoItem } = useContext(TodoContext);
    const [todoInput, setTodoInput] = useState('');

    const onTodoInputChanged = ({target: {value}}) => {
        setTodoInput(value);
    }

    console.log(todoList);

    return (
        <div>
            <input type={'text'} value={todoInput} onChange={onTodoInputChanged}/>
            <button onClick={() => addTodoItem(todoInput)}>Add</button>
            <ul>
                {todoList.map((todo) => {
                    return (
                        <>
                            <li key={todo.id}>{todo.label}</li>
                            <button onClick={() => removeTodoItem(todo.id)}>X</button>
                        </>
                    )
                })}
            </ul>
        </div>
    )
}

const App = () => {
    return (
        <TodoProvider>
            <Todo />
        </TodoProvider>
    )
}

export default App;