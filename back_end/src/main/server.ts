import dotenv from 'dotenv';
import DbConnection from '../infra/db/mongodb/helpers/db-connection.js';
import { setupApp } from './config/app.js';
import { SendTotpToEmail } from '@application/use-cases/TowFactorAuthentication/SendTotpToEmail.js';
import { TOTPAdapter } from '@infra/cryptography/OTPAdapter.js';
import { CreateTotpSecret } from '@application/use-cases/TowFactorAuthentication/CreateTotpSecret.js';
import { makecreateTOTPSecret } from './factories/use-case/towFactorAuthentication/create-TOTP-secret-factory.js';
import { makeAuthenticate } from './factories/use-case/authentication/authenticate-factory.js';
import { UserRepository } from '@infra/db/mongodb/repositories/UserRepositort.js';
import { BcryptAdapter } from '@infra/cryptography/BcryptAdaptor.js';
import { JWTAdapter } from '@infra/cryptography/JWTAdapter.js';

dotenv.config({ path: '/home/mohamed/flutter/cookieStudio/back_end/src/main/config/.env' });
const port = process.env.PORT || 8080;

DbConnection.connect('mongodb://127.0.0.1:27017/social_media')
  .then(() => {
    const app = setupApp();
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port} 🚀`);
    });
  });


// const totpG = new TOTPAdapter()

// console.log(totpG.generate());


// const testEmail = new SendTotpToEmail();

// testEmail.execute({ email: "mohamed.deftex@gmail.com", totp: `This is a test email from Nodemailer using TypeScript!' and this your totp ${totpG.generate()}` })


// const makeTotpsec = makecreateTOTPSecret();
// const SecretetTOTP1 = await makeTotpsec.execute("1111");

// const authTOTP = makeAuthenticate();
// const authTOTP1 = await authTOTP.execute(SecretetTOTP1);


// console.log(SecretetTOTP1)

// console.log(authTOTP1);

// const userRpo = new UserRepository()
// userRpo.updateUserEmailVerify("6571ecd4a4de97d629e93275")




// const salt = 10;

// const bcryptAdapterTest = new BcryptAdapter(salt);


// const myPassword = "Art of security";
// const hashedPassword = await bcryptAdapterTest.hash(myPassword);

// console.log("my password: ", myPassword);
// console.log("my hashed password: ", hashedPassword);


// const key = "mykey";

// const JWTAdapterTest = new JWTAdapter(key);

// const user = {
//   name: "johan liebert",
//   id: "6571ecd4a4de97d629e93275"
// };

// const token = await JWTAdapterTest.generate(user);

// console.log("User token: ", token);

// const verifyUserToken = await JWTAdapterTest.verify(token);

// console.log(verifyUserToken);

// // ? let's change something in the token

// console.log("----------------------------------------")

// const verifyUserToken1 = await JWTAdapterTest.verify(token + "payload");

// if (!verifyUserToken1) {
//   console.log("Invalid token. ", verifyUserToken1)
// } 



