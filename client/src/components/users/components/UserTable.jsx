import styles from "../Users.module.css";
import EditUserButton from "./EditUserButton";
import DeleteUserButton from "./DeleteUserButton";

const SkeletonRow = () => (
    <tr className={styles.skeletonRow}>
        {Array(7).fill(null).map((_, i) => (
            <td key={i}><span className={styles.skeleton} /></td>
        ))}
    </tr>
);

const UserTable = ({ users, onEdit, onDelete }) => (
    <div className={styles.tableWrapper}>
        <table>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Edad</th>
                    <th>Cargo</th>
                    <th>País</th>
                    <th>Experiencia</th>
                    <th>Tecnologías</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {users.length === 0 ? (
                    <>
                        <SkeletonRow />
                        <SkeletonRow />
                        <SkeletonRow />
                        <tr>
                            <td colSpan={7} className={styles.emptyMessage}>
                                No hay usuarios registrados
                            </td>
                        </tr>
                    </>
                ) : (
                    users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.nombre}</td>
                            <td>{user.edad}</td>
                            <td>{user.cargo}</td>
                            <td>{user.pais}</td>
                            <td>{user.experiencia} años</td>
                            <td>
                                {user.tecnologias.map((t) => (
                                    <span key={t} className={styles.badge}>{t}</span>
                                ))}
                            </td>
                            <td>
                                <div className={styles.actions}>
                                    <EditUserButton user={user} onEdit={onEdit} />
                                    <DeleteUserButton userId={user.id} onDelete={onDelete} />
                                </div>
                            </td>
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    </div>
);

export default UserTable;
