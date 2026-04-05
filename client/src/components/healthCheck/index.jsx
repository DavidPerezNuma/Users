import useHealthCheck from "../../hooks/useHealthCheck";
import styles from "./HealthCheck.module.css";

const HealthCheck = ({ onClose }) => {
    const { healthStatus, loading, error } = useHealthCheck();

    if (loading) return (
        <div className={`${styles.alert} ${styles.loading}`}>
            <span className={styles.dot} />
            <span className={styles.message}>Verificando estado del servicio...</span>
        </div>
    );

    if (error) return (
        <div className={`${styles.alert} ${styles.error}`}>
            <span className={styles.dot} />
            <span className={styles.message}>Servicio no disponible</span>
            <button className={styles.close} onClick={onClose}>✕</button>
        </div>
    );

    return (
        <div className={`${styles.alert} ${styles.ok}`}>
            <span className={styles.dot} />
            <span className={styles.message}>Servicio operativo — {healthStatus?.status}</span>
            <button className={styles.close} onClick={onClose}>✕</button>
        </div>
    );
};

export default HealthCheck;
