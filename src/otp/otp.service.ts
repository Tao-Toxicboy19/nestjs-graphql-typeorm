import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OtpService {
    constructor(
        private readonly mailerService: MailerService,
    ) { }

    async generateOTP(): Promise<string> {
        const otp = Math.floor(1000 + Math.random() * 9000).toString()
        return otp
    }

    async sendOTP(email: string, otp: string): Promise<void> {
        try {
            await this.mailerService.sendMail({
                to: email,
                subject: 'OTP Verification',
                template: './otp.hbs',
                context: {
                    otp: otp,
                },
            });
        } catch (error) {
            throw new Error(error);
        }
    }
}