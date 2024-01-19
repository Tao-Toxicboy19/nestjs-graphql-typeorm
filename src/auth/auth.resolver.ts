import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthModel } from './models/auth.model';
import { Auth } from './entities/auth.entity';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
    constructor(private readonly authService: AuthService) { }

    @Mutation(() => AuthModel)
    async saveUser(@Args('dto') dto: AuthDto): Promise<Auth> {
        return await this.authService.saveUser(dto)
    }

}
