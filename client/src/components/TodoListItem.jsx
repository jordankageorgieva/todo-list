import styles from './TodoListItem.module.css';

export default function TodoListItem({
    _id,
    text,
    isCompleted,
    buttonClickHandler
}) {
    return (
        <>
            {/* <!-- Todo item --> */}
            <tr className={styles["todo"] + (isCompleted ? " " + styles["is-completed"] : "")}>
                <td>{text}</td>
                <td>{isCompleted ? "Completed" : "Incompleted"}</td>
                <td className="todo-action">
                    <button className="btn todo-btn" onClick={() => buttonClickHandler(_id)}>Change status</button>
                </td>
            </tr>
        </>
    );
}