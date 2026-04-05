import { createPortal } from "react-dom";
import styles from "./ConfirmModal.module.css";

const ConfirmModal = ({ onConfirm, onCancel }) =>
    createPortal(
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.icon}>⚠️</div>
                <h2 className={styles.title}>Eliminar Usuario</h2>
                <p className={styles.message}>Esta acción no se puede deshacer.<br />¿Deseas continuar?</p>
                <div className={styles.actions}>
                    <button className={styles.btnCancel} onClick={onCancel}>Cancelar</button>
                    <button className={styles.btnConfirm} onClick={onConfirm}>Eliminar</button>
                </div>
            </div>
        </div>,
        document.body
    );

export default ConfirmModal;
