import { useState, useEffect } from "react";
import healthCheckService from "../services/healthCheck.service";

const useHealthCheck = () => {
    const [healthStatus, setHealthStatus] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const checkHealth = async () => {
            try {
                setLoading(true);
                const data = await healthCheckService.checkHealth();
                setHealthStatus(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        checkHealth();
    }, []);

    return { healthStatus, loading, error };
};

export default useHealthCheck;