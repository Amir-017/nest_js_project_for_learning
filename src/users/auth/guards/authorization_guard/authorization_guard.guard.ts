import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthorizationGuardGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user?.role;
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    // console.log(user);
    // console.log(roles);
    
    if (roles && user && !roles.includes(user)) {
      throw new ForbiddenException('Access denied for your role ');
    }
    return true;
  }
}
