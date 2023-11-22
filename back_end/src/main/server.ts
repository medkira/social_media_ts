import dotenv from 'dotenv';
import DbConnection from '../infra/db/mongodb/helpers/db-connection.js';
import { setupApp } from './config/app.js';

dotenv.config({ path: '/home/mohamed/flutter/cookieStudio/back_end/src/main/config/.env' });
const port = process.env.PORT || 8080;


DbConnection.connect('mongodb://127.0.0.1:27017/cookieStudio')
  .then(() => {
    const app = setupApp();
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port} 🚀`);
    });
  })










// export const test = async (email: string): Promise<void> => {


//   const rawuser = await UserModel.findById(email);

//   // console.log(rawuser);

//   console.log(mapDocument(rawuser));
// }

// const email: string = "654fa8e07bb32cb9e44c0f26";

// test(email);
















// const router = Router()
// app.use("/api", router);
// authenticationRoutes(router);

// DbConnection.connect('mongodb://127.0.0.1:27017/cookieStudio')
// .then(() => {
//   const app = setupApp();
//   app.use(bodyParser.json());

//   app.listen(port, () => {
//     console.log(`Server is running at http://localhost:${port} 🚀`);
//   });
// })

