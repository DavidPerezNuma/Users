import UserTable from "./components/UserTable";
import styles from "./Users.module.css";

const Users = ({ users, loading, error, onEdit, onDelete }) => {
    if (loading) return <div className={styles.empty}>Cargando usuarios...</div>;
    if (error) return <div className={styles.empty}>Error: {error.message}</div>;

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Lista de Usuarios</h2>
            <UserTable users={users} onEdit={onEdit} onDelete={onDelete} />
        </div>
    );
};

export default Users;
