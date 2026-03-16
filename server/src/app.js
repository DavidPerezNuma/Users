import express from 'express';
import cors from 'cors';
import { config } from './config/index.js';
import { logErrors, boomError, errorHandler } from './middlewares/error.handler.js';
import { RouterApi } from './routers/index.js';
import { initializeModels } from '#libs/models/index.js';

const app = express();
app.use(express.json());
app.use(cors({ origin: '*' }));

/**
  * @description Initializes tables and models required for the application database.
 */
await initializeModels();

/**
 * @description Registers all API routes.
 */
RouterApi(app);

/**
 * @description Error handling middleware. Logs errors, handles Boom errors, and sends appropriate responses to the client.
 */
app.use(logErrors);
app.use(boomError);
app.use(errorHandler);

/**
 * @description Starts the Express server and listens for incoming requests.
 */
app.listen(config.port, config.host, () => {
  console.log(`Server running on http://${config.host}:${config.port}`);
});