import { SendTotpToEmailInterface } from "@application/interfaces/use-cases/towFactorAuthentication/SendTotpToEmailInterface.js";
import * as nodemailer from 'nodemailer';


export class SendTotpToEmail implements SendTotpToEmailInterface {

    constructor(

    ) { }



    async execute(request: SendTotpToEmailInterface.Request): Promise<string> {

        const { email, totp } = request;

        const emailMessage = `Hi ${email},\nA new login attempt was detected for your social account.\nTo ensure it was you, please enter the following one-time code:\n ${totp} \nThis code is valid for only 30 seconds.\nPlease do not share it with anyone. \nIf you did not attempt to log in, please reset your password immediately and contact our support team.\nSincerely,\nThe Team`;




        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: 'mohamed.dahmanikira@gmail.com',
                pass: 'xktq iags fycn mpib',
            }
        });
        const message = {
            from: 'mohamed.dahmanikira@gmail.com',
            to: email,
            subject: 'Hello from Nodemailer!',
            text: emailMessage,
        };

        transporter.sendMail(message, (error, info) => {
            if (error) {
                console.error(error);
            } else {
                console.log('Email sent successfully!');
            }
        });
        return 'Email sent successfully!';
    }

}