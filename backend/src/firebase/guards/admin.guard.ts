import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly authGuard: AuthGuard) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    await this.authGuard.canActivate(context);
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const role = user.role;
    if (!role || role !== 'admin') {
      throw new UnauthorizedException('User not admin');
    }
    return true;
  }
}
