import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../Schemas/user.scham';
import { JwtModule } from '@nestjs/jwt';
import { log } from 'console';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),  JwtModule.register({
      global: true,
      secret: process.env.API_KEY,
      signOptions: { expiresIn: '2d' },
    }),],
  controllers: [AuthController],
  providers: [AuthService],
})

export class AuthModule {}
