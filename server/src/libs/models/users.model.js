import { db } from "#libs/database.js";

// Initialize users table
const initializeUsersTable = async () => {
  try {
    
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
    
    await db.query(createTableQuery);
    console.log('✓ Users table initialized successfully');
  } catch (err) {
    console.error('✗ Error initializing users table:', err.message);
  }
};

export {
  initializeUsersTable,
};
