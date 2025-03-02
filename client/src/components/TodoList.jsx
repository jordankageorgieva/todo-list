import React, { useState, useEffect } from 'react';
import TodoListItem from './TodoListItem';


export default function TodoList() {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');
    const [isPending, setIsPending] = useState(false);

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        setIsPending(true);
        try {
            const response = await fetch('http://localhost:3001/data/todos');
            const data = await response.json();
            setTodos(Object.values(data));
        } catch (error) {
            console.error('Error fetching todos:', error);
        } finally {
            setIsPending(false);
        }
    };

    const handleAddTodo = async (e) => {
        e.preventDefault();
        const newTodoItem = {
            _id: `todo_${Date.now()}`,
            text: newTodo,
            isCompleted: false
        };

        try {
            const response = await fetch(`http://localhost:3001/data/todos/${newTodoItem._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newTodoItem)
            });

            if (response.ok) {
                setTodos([...todos, newTodoItem]);
                setNewTodo('');
            } else {
                console.error('Failed to add new todo:', response.statusText);
            }
        } catch (error) {
            console.error('Error adding new todo:', error);
        }
    };

    const handleRemoveTodo = async (_id) => {
        try {
            const response = await fetch(`http://localhost:3001/data/todos/${_id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                setTodos(todos.filter(todo => todo._id !== _id));
            } else {
                console.error('Failed to remove todo:', response.statusText);
            }
        } catch (error) {
            console.error('Error removing todo:', error);
        }
    };

    const buttonClickHandler = (_id) => {
        // Implement the button click handler logic here
    };

    return (
        <>
            <section className="todo-list-container">
                <h1>Todo List</h1>

                <div className="add-btn-container">
                    <form onSubmit={handleAddTodo}>
                        <input
                            type="text"
                            value={newTodo}
                            onChange={(e) => setNewTodo(e.target.value)}
                            placeholder="Add new todo"
                            required
                        />
                        <button type="submit" className="btn">+ Add new Todo</button>
                    </form>
                </div>

                <div className="table-wrapper">
                    {isPending && (
                        <div className="loading-container">
                            <div className="loading-spinner">
                                <span className="loading-spinner-text">Loading</span>
                            </div>
                        </div>
                    )}

                    <table className="table">
                        <thead>
                            <tr>
                                <th className="table-header-task">Task</th>
                                <th className="table-header-status">Status</th>
                                <th className="table-header-action">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {todos.map(todo => (
                                <TodoListItem
                                    key={todo._id}
                                    _id={todo._id}
                                    text={todo.text}
                                    isCompleted={todo.isCompleted}
                                    buttonClickHandler={buttonClickHandler}
                                    handleRemoveTodo={handleRemoveTodo}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    );
}