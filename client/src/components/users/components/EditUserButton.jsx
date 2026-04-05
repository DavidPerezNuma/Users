import styles from "../Users.module.css";

const EditUserButton = ({ user, onEdit }) => (
    <button className={styles.btnEdit} onClick={() => onEdit(user)}>Editar</button>
);

export default EditUserButton;
