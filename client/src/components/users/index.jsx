import useUsers from "../../hooks/userUser";
import UserTable from "./components/UserTable";
import styles from "./Users.module.css";

const Users = () => {
    const { users, loading, error, deleteUser, updateUser } = useUsers();

    if (loading) return <div className={styles.empty}>Cargando usuarios...</div>;
    if (error) return <div className={styles.empty}>Error: {error.message}</div>;

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Lista de Usuarios</h2>
            {users.length === 0 ? (
                <p className={styles.empty}>No hay usuarios registrados.</p>
            ) : (
                <UserTable users={users} onEdit={updateUser} onDelete={deleteUser} />
            )}
        </div>
    );
};

export default Users;
