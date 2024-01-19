import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Auth])],
  providers: [AuthService, AuthResolver]
})
export class AuthModule { }
