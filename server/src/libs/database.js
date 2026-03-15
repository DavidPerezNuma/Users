import mysql from 'mysql2/promise';
import { config } from '../config/index.js';

class MySQLLib {
  constructor() {
    this.pool = mysql.createPool({
      host: config.dbHost,
      user: config.dbUser,
      password: config.dbPassword,
      database: config.dbName,
      port: config.dbPort,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });
  }

  async getConnection() {
    return await this.pool.getConnection();
  }

  async query(sql, params = []) {
    const connection = await this.pool.getConnection();
    try {
      const [rows] = await connection.execute(sql, params);
      return rows;
    } catch (error) {
      console.error('MySQL query error:', {
        sql,
        message: error.message,
        code: error.code
      });
      throw error;
    } finally {
      connection.release();
    }
  }

  // Obtener todos los registros
  async find(table, conditions = {}) {
    try {
      const keys = Object.keys(conditions);

      let sql = `SELECT * FROM ${table}`;
      let params = [];

      if (keys.length) {
        const where = keys.map(key => `${key} = ?`).join(' AND ');
        sql += ` WHERE ${where}`;
        params = Object.values(conditions);
      }

      return await this.query(sql, params);
    } catch (error) {
      console.error('Error fetching records:', {
        table,
        message: error.message,
        code: error.code
      });
      throw error;
    }
  }

  // Obtener un solo registro
  async findOne(table, conditions) {
    try {
      const keys = Object.keys(conditions);
      const where = keys.map(key => `${key} = ?`).join(' AND ');

      const sql = `SELECT * FROM ${table} WHERE ${where} LIMIT 1`;
      const params = Object.values(conditions);

      const rows = await this.query(sql, params);
      return rows[0] || null;
    } catch (error) {
      console.error('Error fetching single record:', {
        table,
        message: error.message,
        code: error.code
      });
      throw error;
    }
  }

  // Crear registro
  async create(table, data) {
    const keys = Object.keys(data);
    const values = Object.values(data);

    const columns = keys.join(', ');
    const placeholders = keys.map(() => '?').join(', ');

    const sql = `INSERT INTO ${table} (${columns}) VALUES (${placeholders})`;

    const connection = await this.getConnection();
    try {
      const [result] = await connection.execute(sql, values);
      return {
        id: result.insertId,
        ...data
      };
    }
    catch (error) {
      console.error('Error creating record:', {
        table,
        data,
        message: error.message,
        code: error.code
      });
      throw error;
    } finally {
      connection.release();
    }
  }

  // Actualizar registro
  async update(table, id, data) {
    try {
      const keys = Object.keys(data);

      const setClause = keys.map(key => `${key} = ?`).join(', ');
      const values = [...Object.values(data), id];

      const sql = `UPDATE ${table} SET ${setClause} WHERE id = ?`;

      await this.query(sql, values);

      return { id, ...data };
    } catch (error) {
      console.error('Error updating record:', {
        table,
        id,
        message: error.message,
        code: error.code
      });
      throw error;
    }
  }

  // Eliminar registro
  async delete(table, id) {
    const sql = `DELETE FROM ${table} WHERE id = ?`;
    const connection = await this.getConnection();
    try {
      const [result] = await connection.execute(sql, [id]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error('Error deleting record:', {
        table,
        id,
        message: error.message,
        code: error.code
      });
      throw error;
    } finally {
      connection.release();
    }
  }
}

const db = new MySQLLib();

export { db };