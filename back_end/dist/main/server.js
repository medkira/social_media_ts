import express from 'express';
import dotenv from 'dotenv';
import DbConnection from '../infra/db/mongodb/helpers/db-connection.js';
dotenv.config({ path: '/home/mohamed/flutter/cookieStudio/back_end/src/main/config/.env' });
const app = express();
const port = process.env.PORT || 8080;
app.get('/', (req, res) => {
    res.send('Express TypeScript Server ');
});
DbConnection.connect('mongodb://127.0.0.1:27017/cookieStudio')
    .then(() => {
    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port} 🚀`);
    });
});
//# sourceMappingURL=server.js.map