import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { TokenModel } from './models/toke.model';
import { jwtConstants } from 'src/utils/constants';
import { OtpService } from 'src/otp/otp.service';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Users)
        private readonly repoUser: Repository<Users>,
        private jwtService: JwtService,
        private otpService: OtpService
    ) { }

    async registerLocal(dto: RegisterDto): Promise<Users> {
        try {
            const existingUser = await this.repoUser.findOne({ where: { username: dto.username } })

            if (existingUser) {
                throw new Error("Username already exists");
            }

            const hash = await bcrypt.hash(dto.password, 12)
            const user = await this.repoUser.save({
                username: dto.username,
                password: hash,
                role: dto.role,
                email: dto.email
            })

            return user
        } catch (error) {
            throw new Error(error)
        }
    }

    async generateHash(data: string): Promise<string> {
        const secretKey = jwtConstants.secret
        return await this.jwtService.signAsync({ data }, { algorithm: 'HS512', secret: secretKey })
    }

    async verifyOTP(userId: string, otp: string): Promise<boolean> {
        const user = await this.repoUser.findOne({ where: { id: userId } })
        return user && user.otp === otp
    }

    async loginLocal(dto: LoginDto): Promise<TokenModel> {
        try {
            const user = await this.repoUser.findOne({ where: { username: dto.username } })
            if (!user) {
                throw new NotFoundException('User not found')
            }

            const isPasswordValid = await bcrypt.compare(dto.password, user.password)
            if (!isPasswordValid) {
                throw new UnauthorizedException('Invalid password')
            }

            const payload = { sub: user.id, username: dto.username }

            const otp = await this.otpService.generateOTP()
            user.otp = otp
            await this.repoUser.save(user)
            await this.otpService.sendOTP(user.email, otp)

            const token = await this.jwtService.signAsync(payload)
            const hashToken = { accessToken: await this.generateHash(token) }

            return hashToken
        } catch (error) {
            throw new Error(error)
        }
    }
}
