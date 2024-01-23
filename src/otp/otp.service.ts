import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OtpService {
    constructor(
        private readonly mailerService: MailerService,
    ) { }

    async generateOTP(): Promise<string> {
        const otp = Math.floor(1000 + Math.random() * 9000).toString();
        return otp;
    }

    async sendOTP(email: string, otp: string): Promise<void> {
        try {
            const mailOptions = {
                to: email,
                subject: 'Test Email',
                html: `<h1>Your OTP is: ${otp}</h1>`,
            };

            await this.mailerService.sendMail(mailOptions)
        } catch (error) {
            throw new Error(error)
        }
    }
}
