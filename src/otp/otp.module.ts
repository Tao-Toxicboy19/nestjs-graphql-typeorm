import { Module } from '@nestjs/common'
import { OtpService } from './otp.service'
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'
import { MailerModule } from '@nestjs-modules/mailer'
import { mail } from 'src/utils/constants'

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        service: 'gmail',
        auth: {
          user: 'themanpoolbot@gmail.com',
          pass: 'jvpp fujd ecvy pifo'
        },
      },
    }),
  ],
  providers: [OtpService],
  exports: [OtpService]
})
export class OtpModule { }
