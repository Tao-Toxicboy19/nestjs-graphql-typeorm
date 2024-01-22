import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const { headers } = ctx.getContext().req;

    if (!headers || !headers.authorization) {
      throw new UnauthorizedException()
    }

    const token = headers.authorization.replace('Bearer ', '');

    try {
      await this.jwtService.verifyAsync(token, { algorithms: ['HS512'] })
      return true

    } catch (error) {
      throw new UnauthorizedException()
    }
  }
}
