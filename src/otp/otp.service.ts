import { Injectable } from '@nestjs/common';
import * as speakeasy from 'speakeasy';


@Injectable()
export class OtpService {
    async generateSecret(): Promise<string> {
        try {
            const secret = speakeasy.generateSecret({ length: 10 })
            return secret.base32
        } catch (error) {
            throw new Error(error)
        }
    }

    async generateOTP(secret: string): Promise<string> {
        try {
            const otp = speakeasy.totp({
                secret,
                encoding: 'base32'
            })
            return otp
        } catch (error) {
            throw new Error(error)
        }
    }

    async verifyOTP(secret: string, otp: string): Promise<boolean> {
        try {
            return speakeasy.totp.verify({
                secret,
                encoding: 'base32',
                token: otp
            })
        } catch (error) {
            throw new Error(error)
        }
    }
}
