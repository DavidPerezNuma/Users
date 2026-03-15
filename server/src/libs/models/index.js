import { initializeUsersTable } from './users.model.js';
import Boom from '@hapi/boom';

async function initializeModels() {
  try {
    await initializeUsersTable();
  } catch (error) {
    throw Boom.badImplementation('Error initializing models');
  }
}

export { initializeModels };