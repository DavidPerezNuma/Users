import api from './api';

const healthCheckService = {
    checkHealth: async () => {
        try {
            const response = await api.get('/health');
            return response.data;
        } catch (error) {
            console.error('Error checking health:', error);
            throw error;
        }
    }
};

export default healthCheckService;
