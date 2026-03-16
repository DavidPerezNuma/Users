import styles from "../Users.module.css";

const DeleteUserButton = ({ userId, onDelete }) => {
    const handleDelete = async () => {
        if (!confirm("¿Eliminar este usuario?")) return;
        await onDelete(userId);
    };

    return (
        <button className={styles.btnDelete} onClick={handleDelete}>Eliminar</button>
    );
};

export default DeleteUserButton;
