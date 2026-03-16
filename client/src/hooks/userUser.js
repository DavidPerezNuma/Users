import { useState, useEffect } from "react";
import userService from "../services/user.service";

const useUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                const data = await userService.getAllUsers();
                setUsers(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const createUser = async (userData) => {
        try {
            const newUser = await userService.createUser(userData);
            setUsers(prev => [...prev, newUser]);
            return newUser;
        } catch (err) {
            setError(err);
            throw err;
        }
    };

    const updateUser = async (id, userData) => {
        try {
            const updated = await userService.updateUser(id, userData);
            setUsers(prev => prev.map(u => u.id === id ? updated : u));
            return updated;
        } catch (err) {
            setError(err);
            throw err;
        }
    };

    const deleteUser = async (id) => {
        try {
            await userService.deleteUser(id);
            setUsers(prev => prev.filter(u => u.id !== id));
        } catch (err) {
            setError(err);
            throw err;
        }
    };

    const getUserById = async (id) => {
        try {
            return await userService.getUserById(id);
        } catch (err) {
            setError(err);
            throw err;
        }
    };

    return { users, loading, error, createUser, updateUser, deleteUser, getUserById };
};

export default useUsers;
