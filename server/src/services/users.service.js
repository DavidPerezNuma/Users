import Boom from "@hapi/boom";
import { db } from "#libs/database.js";

class UsersService {
    constructor() {
        this.table = 'users';
    }

    async getAll() {
        try {
            const users = await db.find(this.table);
            if (users.length === 0) {
                throw Boom.notFound('No users found');
            }
            return users;
        } catch (error) {
            if (error.isBoom) throw error;
            throw Boom.internal('Error fetching users', { originalError: error.message });
        }
    }

    async getById(id) {
        try {
            const user = await db.findOne(this.table, { id });
            if (!user) {
                throw Boom.notFound('User not found');
            }
            return user;
        } catch (error) {
            if (error.isBoom) throw error;
            throw Boom.internal('Error fetching user', { originalError: error.message });
        }
    }

    async create(data) {
        try {
            const user = await db.create(this.table, data);
            return user;
        } catch (error) {
            if (error.isBoom) throw error;
            throw Boom.internal('Error creating user', { originalError: error.message });
        }
    }

    async update(id, data) {
        try {
            const user = await db.findOne(this.table, { id });
            if (!user) {
                throw Boom.notFound('User not found');
            }
            return await db.update(this.table, id, data);
        } catch (error) {
            if (error.isBoom) throw error;
            throw Boom.internal('Error updating user', { originalError: error.message });
        }
    }

    async delete(id) {
        try {
            const user = await db.findOne(this.table, { id });
            if (!user) {
                throw Boom.notFound('User not found');
            }
            await db.delete(this.table, id);
            return { message: 'User deleted successfully' };
        } catch (error) {
            if (error.isBoom) throw error;
            throw Boom.internal('Error deleting user', { originalError: error.message });
        }
    }

}

export const usersService = new UsersService();

