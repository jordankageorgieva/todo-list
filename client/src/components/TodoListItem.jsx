import styles from './TodoListItem.module.css';

export default function TodoListItem({
    _id,
    text,
    isCompleted,
    handleChangeTodoStatus,
    handleRemoveTodo
}) {
    return (
        <>
            {/* <!-- Todo item --> */}
            <tr className={styles["todo"] + (isCompleted ? " " + styles["is-completed"] : "")}>
                <td>{text}</td>
                <td>{isCompleted ? "Completed" : "Incompleted"}</td>
                <td className="todo-action">
                    <button className="btn todo-btn" onClick={() => handleChangeTodoStatus(_id)}>Change status</button>
                    <button className="btn btn-remove" onClick={() => handleRemoveTodo(_id)}>Remove</button>
                </td>
            </tr>
        </>
    );
}