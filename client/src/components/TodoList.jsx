import { useEffect, useState } from 'react';
import TodoListItem from './TodoListItem';

export default function TodoList() {

    const [todos, setTodos] = useState([]);
    const [isPending, setIsPending] = useState(true);
    
    console.log(todos);

    useEffect(() => {
        // const url = 'http://localhost:3030/jsonstore/todos';
        const url = 'http://localhost:3001/data/todos';
        fetch(url)
            .then(res => res.json())
            .then(data => {
                const result = Object.values(data);
                setTodos(result);
                // when data is available already, set isPending to false
                setIsPending(false);
            })
            .catch(err => console.log(err.message));
    }, []);

    const buttonClickHandler = (_id) => {
        
        // HARD-CORE
        // setTodos(oldTodo => oldTodo.map(todo => todo._id === _id ? { ...todo, isCompleted: !todo.isCompleted } : todo));
        console.log('Button clicked with id: ' + _id);
        handleUpdate(_id);
        
        // setTodos(oldTodos => oldTodos.map(todo => {
        //     if (todo._id === _id) {
        //         return { ...todo, isCompleted: !todo.isCompleted };
        //     }
        //     return todo;
        // }));
    }

    const handleUpdate = async (id) => {
        console.log('Button clicked with id: ' + id);
        const todo = todos.find(x => x._id === id);
        const response = await fetch(`http://localhost:3030/jsonstore/todos/${id}`, {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                _id: id,
                text: todo.text,
                isCompleted: !todo.isCompleted
            })
        });

        if (response.ok) {
            const updatedTodo = await response.json();
            setTodos(todos.map(x => x._id === id ? updatedTodo : x));
        }
    }

    return (
        <>
            {/* <!-- Section container --> */}
            <section className="todo-list-container">
                <h1>Todo List</h1>

                <div className="add-btn-container">
                    <button className="btn">+ Add new Todo</button>
                </div>

                <div className="table-wrapper">

                    {/* <!-- Loading spinner - show the load spinner when fetching the data from the server--> */}
                    {isPending &&
                        <div className="loading-container">
                            <div className="loading-spinner">
                                <span className="loading-spinner-text">Loading</span>
                            </div>
                        </div>
                    }

                    {/* <!-- Todo list table --> */}
                    <table className="table">
                        <thead>
                            <tr>
                                <th className="table-header-task">Task</th>
                                <th className="table-header-status">Status</th>
                                <th className="table-header-action">Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            {todos.map(todo =>
                                <TodoListItem
                                    key={todo._id}
                                    _id={todo._id}
                                    text={todo.text}
                                    isCompleted={todo.isCompleted}
                                    buttonClickHandler={buttonClickHandler}
                                />
                            )}

                            {/* <TodoListItem />

                            <TodoListItem /> */}

                            {/* <!-- Todo item -->
                            <tr className="todo is-completed">
                                <td>Feed cat</td>
                                <td>Complete</td>
                                <td className="todo-action">
                                    <button className="btn todo-btn">Change status</button>
                                </td>
                            </tr> */}

                            {/* <!-- Todo item --> */}
                            {/* <tr className="todo">
                                <td>Change light bulbs</td>
                                <td>Incomplete</td>
                                <td className="todo-action">
                                    <button className="btn todo-btn">Change status</button>
                                </td>
                            </tr> */}

                            {/* <!-- Todo item --> */}
                            {/* <tr className="todo is-completed">
                                <td>Feed cat</td>
                                <td>Complete</td>
                                <td className="todo-action">
                                    <button className="btn todo-btn">Change status</button>
                                </td>
                            </tr> */}

                        </tbody>
                    </table>
                </div>
            </section>
        </>
    );
}
