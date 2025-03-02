import React, { useState, useEffect } from 'react';
import TodoListItem from './TodoListItem';


export default function TodoList() {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');
    const [isPending, setIsPending] = useState(false);

    // const url = 'http://localhost:3001/data/todos';
    const url = 'https://todo-list-server-tau.vercel.app/data/todos';

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        setIsPending(true);
        try {
            const response = await fetch(url);
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
            const response = await fetch(`${url}/${newTodoItem._id}`, {
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
            const response = await fetch(`${url}/${_id}`, {
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

    const handleChangeTodo = async (_id) => {
        const todo = todos.find(todo => todo._id === _id);
        if (!todo) return;

        const updatedTodo = { ...todo, isCompleted: !todo.isCompleted };

        try {
            const response = await fetch(`${url}/${_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedTodo)
            });

            if (response.ok) {
                setTodos(todos.map(todo => (todo._id === _id ? updatedTodo : todo)));
            } else {
                console.error('Failed to update todo:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    };

    return (
        <>
            <section className="todo-list-container">
                <h1>Useful Book resources</h1>
                <h2>2 March 2025</h2>

                <div className="add-btn-container">
                    <form onSubmit={handleAddTodo}>
                        <input
                            type="text"
                            value={newTodo}
                            onChange={(e) => setNewTodo(e.target.value)}
                            placeholder="Add a book to read..."
                            required
                        />
                        <button type="submit" className="btn">+ Book to read!</button>
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
                                <th className="table-header-task">Book</th>
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
                                    handleChangeTodoStatus={handleChangeTodo}
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