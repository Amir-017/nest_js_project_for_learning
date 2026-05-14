import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../Schemas/user.scham';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(@InjectModel('User') private userModel: Model<User> , private jwtService: JwtService) {}

  async Login({ email, password }: CreateAuthDto) {
    if (!email || !password) {
      throw new BadRequestException('Email and password are required');
    }

    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new BadRequestException('Invalid email or password');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new BadRequestException('Invalid email or password');
    }

    const payload = { email: user.email, id: user._id, role: user.role };
    const token = this.jwtService.sign(payload, { secret: process.env.API_KEY, expiresIn: '1h' });

    return { accessToken: token };
  }
}
