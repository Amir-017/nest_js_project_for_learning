import { JwtService } from '@nestjs/jwt';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuardGuard implements CanActivate {
  constructor(private _JwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
  //  console.log(authHeader);
    if (!authHeader) {
      throw new UnauthorizedException(
        'You are not Login to access this resource',
      );
    }
    const payload = this._JwtService.verify(authHeader, {
      secret: process.env.API_KEY,
    });    
    if (!payload) {
      throw new UnauthorizedException(
        'You are not authenticated to access this resource',
      );
    }
    request.user = payload;
    return true;
  }   
}
    