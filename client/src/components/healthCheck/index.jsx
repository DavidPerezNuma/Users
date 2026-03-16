import useHealthCheck from "../../hooks/useHealthCheck";
import styles from "./HealthCheck.module.css";

const HealthCheck = () => {
    const { healthStatus, loading, error } = useHealthCheck();

    if (loading) return (
        <div className={`${styles.alert} ${styles.loading}`}>
            <span className={styles.dot} />
            Verificando estado del servicio...
        </div>
    );

    if (error) return (
        <div className={`${styles.alert} ${styles.error}`}>
            <span className={styles.dot} />
            Servicio no disponible
        </div>
    );

    return (
        <div className={`${styles.alert} ${styles.ok}`}>
            <span className={styles.dot} />
            Servicio operativo — {healthStatus?.status}
        </div>
    );
};

export default HealthCheck;
