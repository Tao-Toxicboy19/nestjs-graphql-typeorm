import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthModel } from './models/auth.model';
import { AuthService } from './auth.service';
import { TokenModel } from './models/toke.model';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Resolver()
export class AuthResolver {
    constructor(private readonly authService: AuthService) { }

    @Mutation(() => AuthModel)
    async registerLocal(@Args('register') dto: RegisterDto): Promise<AuthModel> {
        return await this.authService.registerLocal(dto)
    }

    @Mutation(() => TokenModel)
    async loginLocal(@Args('login') dto: LoginDto): Promise<TokenModel> {
        return await this.authService.loginLocal(dto)
    }

}
