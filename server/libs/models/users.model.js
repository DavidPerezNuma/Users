import { pool } from '../database.js';

// Helper function to parse JSON field
const parseTecnologias = (tecnologias) => {
  if (!tecnologias) return [];
  if (typeof tecnologias === 'string') return JSON.parse(tecnologias);
  return tecnologias; // Already an object
};

// Initialize users table
const initializeUsersTable = async () => {
  try {
    const connection = await pool.getConnection();
    
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(255) NOT NULL,
        edad INT,
        cargo VARCHAR(255),
        pais VARCHAR(255),
        experiencia INT,
        tecnologias JSON,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `;
    
    await connection.execute(createTableQuery);
    console.log('✓ Users table initialized');
    connection.release();
  } catch (err) {
    console.error('✗ Error initializing users table:', err.message);
  }
};

// Create a new user
const createUser = async (userData) => {
  try {
    const connection = await pool.getConnection();
    
    const { nombre, edad, cargo, pais, experiencia, tecnologias } = userData;
    const tecnologiasJSON = JSON.stringify(tecnologias || []);
    
    const query = `
      INSERT INTO users (nombre, edad, cargo, pais, experiencia, tecnologias)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    
    const [result] = await connection.execute(query, [
      nombre,
      edad,
      cargo,
      pais,
      experiencia,
      tecnologiasJSON
    ]);
    
    connection.release();
    return { id: result.insertId, ...userData };
  } catch (err) {
    console.error('Error creating user:', err.message);
    throw err;
  }
};

// Get all users
const getAllUsers = async () => {
  try {
    const connection = await pool.getConnection();
    
    const [rows] = await connection.execute('SELECT * FROM users');
    
    // Parse JSON fields
    const users = rows.map(user => ({
      ...user,
      tecnologias: parseTecnologias(user.tecnologias)
    }));
    
    connection.release();
    return users;
  } catch (err) {
    console.error('Error fetching users:', err.message);
    throw err;
  }
};

// Get user by ID
const getUserById = async (id) => {
  try {
    const connection = await pool.getConnection();
    
    const [rows] = await connection.execute('SELECT * FROM users WHERE id = ?', [id]);
    
    if (rows.length === 0) {
      connection.release();
      return null;
    }
    
    const user = {
      ...rows[0],
      tecnologias: parseTecnologias(rows[0].tecnologias)
    };
    
    connection.release();
    return user;
  } catch (err) {
    console.error('Error fetching user:', err.message);
    throw err;
  }
};

// Update user
const updateUser = async (id, userData) => {
  try {
    const connection = await pool.getConnection();
    
    const { nombre, edad, cargo, pais, experiencia, tecnologias } = userData;
    const tecnologiasJSON = JSON.stringify(tecnologias || []);
    
    const query = `
      UPDATE users
      SET nombre = ?, edad = ?, cargo = ?, pais = ?, experiencia = ?, tecnologias = ?
      WHERE id = ?
    `;
    
    await connection.execute(query, [
      nombre,
      edad,
      cargo,
      pais,
      experiencia,
      tecnologiasJSON,
      id
    ]);
    
    connection.release();
    return { id, ...userData };
  } catch (err) {
    console.error('Error updating user:', err.message);
    throw err;
  }
};

// Delete user
const deleteUser = async (id) => {
  try {
    const connection = await pool.getConnection();
    
    const query = 'DELETE FROM users WHERE id = ?';
    const [result] = await connection.execute(query, [id]);
    
    connection.release();
    return result.affectedRows > 0;
  } catch (err) {
    console.error('Error deleting user:', err.message);
    throw err;
  }
};

export {
  initializeUsersTable,
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
};
