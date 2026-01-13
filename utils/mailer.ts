import nodemailer from 'nodemailer'
import User from '@/models/userModel';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
dotenv.configDotenv()


export interface Mailer{
    email:string,
    emailType:'VERIFY'|'FORGOTPASS',
    userId:string,
}

export const sendMail  = async ({email ,emailType,userId}:Mailer) => {
try {
        const hashedToken = await bcrypt.hash(userId.toString(),10)


        if(emailType == 'VERIFY'){
            await User.findByIdAndUpdate(userId,
            {
                $set:{verifyToken:hashedToken,verifyTokenExpiry:Date.now()+8556952000000 //270 years in unix MILLIS
                }
            })
        }

        

        if(emailType == 'FORGOTPASS'){
            await User.findByIdAndUpdate(userId,
                {set:{forgotPasswordToken:hashedToken,forgotPasswordTokenExpiry:Date.now()+8556952000000
            }})
        }
        
        let transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.MAILER_USER,
                pass: process.env.MAILER_PASS
            }
        });
    
        const mailOptions = {
            from: '"Maddison Foo Koch" <maddison53@ethereal.email>',
            to: email,
            subject: emailType == 'VERIFY'?"Verify your email":"Reset your password",
            html: `<p style="text-align:center;">
                <a
                    href="${process.env.DOMAIN}/api/users/verifyemail?token=${hashedToken}"
                    style="
                    display:inline-block;
                    padding:12px 20px;
                    background-color:#2563eb;
                    color:#ffffff;
                    text-decoration:none;
                    border-radius:6px;
                    font-weight:600;
                    font-family:Arial,Helvetica,sans-serif;
                    "
                >
                    ${emailType === 'VERIFY'
                    ? 'Verify your email address'
                    : 'Reset your password'}
                </a>
                </p>`,
    
        }
    
        const mailResponse = await transporter.sendMail(mailOptions)
        return mailResponse
    
} catch (error:any) {
    throw new Error(error.message)
    
    
}

}