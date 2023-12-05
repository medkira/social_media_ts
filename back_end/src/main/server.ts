import dotenv from 'dotenv';
import DbConnection from '../infra/db/mongodb/helpers/db-connection.js';
import { setupApp } from './config/app.js';

dotenv.config({ path: '/home/mohamed/flutter/cookieStudio/back_end/src/main/config/.env' });
const port = process.env.PORT || 8080;

DbConnection.connect('mongodb://127.0.0.1:27017/social_media')
  .then(() => {
    const app = setupApp();
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port} 🚀`);
    });
  })

