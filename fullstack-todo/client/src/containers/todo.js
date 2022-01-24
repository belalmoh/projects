import { useContext, useState } from 'react';
import { TodoContext, TodoProvider } from '../context/todo';

const TodoContainer = () => {
    const { todos, addTodo, deleteTodo, toggleTodo } = useContext(TodoContext);
    const [todoName, setTodoName] = useState('');

    const handleOnKeyUp = (e) => {
        if (e.keyCode === 13) {
            addTodo(todoName);
            setTodoName('');
        }
    }

    return (
        <div className='bg-gradient-to-r from-cyan-500 to-blue-500 min-h-screen'>
            <div className='flex flex-col items-center justify-center'>
                <div className="py-12 w-3/4 mt-8 flex flex-col items-center justify-center bg-white rounded-md shadow-2xl">
                    <p className='text-2xl font-bold'>Add Todo</p>
                    <input type="text" value={todoName}
                        className='p-4 w-11/12 mt-4 outline-none border border-t-0 border-l-0 border-r-0 border-b-4 focus:border-b-indigo-500'
                        onChange={(e) => setTodoName(e.target.value)}
                        onKeyUp={handleOnKeyUp}
                        placeholder='I need to ...' />
                </div>

                <ul role="list" className="space-y-3 w-3/4 mt-10">
                    {todos.map((todo) => (
                        <li key={`todo-${todo.id}`} className={`bg-white shadow overflow-hidden rounded-md px-6 py-4 align-middle flex items-center justify-between transition-colors ${todo.isDone ? `transition ease-in-out delay-75 bg-emerald-400` : ``}`}>
                            <div className={`float-left ${todo.isDone ? `text-white` : `text-black`}`}>
                                {todo.name}
                            </div>

                            <div className='float-right'>
                                <span className="relative z-0 inline-flex shadow-sm rounded-md">
                                    <button className='relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50' onClick={() => deleteTodo(todo.id)}>Delete</button>
                                    <button className='-ml-px relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10' onClick={() => toggleTodo(todo.id)}>Toggle</button>
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
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