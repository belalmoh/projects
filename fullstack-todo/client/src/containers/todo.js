import { useContext } from 'react';
import {TodoContext, TodoProvider} from '../context/todo';

const TodoContainer = () => {
    const {todos, addTodo} = useContext(TodoContext);

    return (
        <div>
            <button onClick={() => {addTodo('test')}}>CLICK TO ADD</button>
            {
                todos.map((todo) => {
                    return (
                        <div key={todo.id}>{todo.name}</div>
                    )
                })
            }
        </div>
    )
}

const Todo = () => {
    return (
        <TodoProvider>
            <TodoContainer />
        </TodoProvider>
    )
}

export default Todo;