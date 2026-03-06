import express from 'express';
import { config } from './config/index.js';
import { pool } from './libs/database.js';
import { initializeUsersTable } from './libs/models/users.model.js';
import usersRouter from './routers/users.router.js';

const app = express();

app.use(express.json());

// Initialize database tables
initializeUsersTable();

// Test database connection
pool.getConnection()
  .then(connection => {
    console.log('✓ Database connected');
    connection.release();
  })
  .catch(err => {
    console.error('✗ Database connection failed:', err.message);
  });

// Routes
app.use('/api/usuarios', usersRouter);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(config.port, config.host, () => {
  console.log(`Server running on http://${config.host}:${config.port}`);
});
