import { useState } from "react";
import styles from "../Users.module.css";
import ConfirmModal from "./ConfirmModal";

const DeleteUserButton = ({ userId, onDelete }) => {
    const [showModal, setShowModal] = useState(false);

    const handleConfirm = async () => {
        setShowModal(false);
        await onDelete(userId);
    };

    return (
        <>
            <button className={styles.btnDelete} onClick={() => setShowModal(true)}>Eliminar</button>
            {showModal && <ConfirmModal onConfirm={handleConfirm} onCancel={() => setShowModal(false)} />}
        </>
    );
};

export default DeleteUserButton;
