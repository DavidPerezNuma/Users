import { Router } from 'express';
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
} from '../libs/models/users.model.js';

const router = Router();

// Create user
router.post('/', async (req, res) => {
  try {
    const user = await createUser(req.body);
    res.status(201).json({
      success: true,
      data: user,
      message: 'Usuario creado exitosamente'
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error al crear usuario',
      error: err.message
    });
  }
});

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json({
      success: true,
      data: users,
      count: users.length
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener usuarios',
      error: err.message
    });
  }
});

// Get user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await getUserById(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener usuario',
      error: err.message
    });
  }
});

// Update user
router.put('/:id', async (req, res) => {
  try {
    const user = await updateUser(req.params.id, req.body);
    res.status(200).json({
      success: true,
      data: user,
      message: 'Usuario actualizado exitosamente'
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error al actualizar usuario',
      error: err.message
    });
  }
});

// Delete user
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await deleteUser(req.params.id);
    
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Usuario eliminado exitosamente'
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error al eliminar usuario',
      error: err.message
    });
  }
});

export default router;
