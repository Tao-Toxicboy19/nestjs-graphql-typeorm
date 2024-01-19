import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { Repository } from 'typeorm';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Auth)
        private readonly repoAuth: Repository<Auth>
    ) { }

    async saveUser(dto: AuthDto): Promise<Auth> {
        try {
            const hash = await bcrypt.hash(dto.password, 12)
            const user = await this.repoAuth.save({ username: dto.username, password: hash })

            return user
        } catch (error) {
            throw new Error(error)
        }
    }
}
