import express, { Express } from 'express';
import { setupRoutes } from './routes.js';
import bodyParser from 'body-parser';
import { setupMiddleware } from './middleware.js';


export const setupApp = (): Express => {
    const app = express();
    setupMiddleware(app);
    setupRoutes(app)

    return app;
}