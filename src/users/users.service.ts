import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthProvider, User } from './Schemas/user.scham';
import * as bcrypt from 'bcrypt';
import { log } from 'console';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<User>) { }
 ////////////////////////////////////////////////////////////

 // Create new user (register)

 ////////////////////////////////////////////////////////////
  async create(createUserDto: CreateUserDto) {
    if (!createUserDto.password) {
      throw new BadRequestException('Password is required for local signup');
    }

    const hashPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = await this.userModel.create({
      ...createUserDto,
      password: hashPassword,
      authProvider: AuthProvider.LOCAL,
    });
    return user;
  }

  ////////////////////////////////////////////////////////////
  
  // Get all users

  ////////////////////////////////////////////////////////////
  findAll() {
    log('findAll called');
    return this.userModel.find();
  }

  ////////////////////////////////////////////////////////////

  // Get user by ID

  ////////////////////////////////////////////////////////////
  findOne(id: string) {
    log(id);
    log('hi there')
    // log('findOne called with id:');
    return this.userModel.findById(id);
  }

  ////////////////////////////////////////////////////////////

  // Update user

  ////////////////////////////////////////////////////////////
  async update(id: string, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      updateUserDto.password = bcrypt.hashSync(updateUserDto.password, 10);
    }


    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
  }
   
  ////////////////////////////////////////////////////////////

  // Delete user

  ////////////////////////////////////////////////////////////
  remove(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }

  ////////////////////////////////////////////////////////////

  // Get logged in user information

  ////////////////////////////////////////////////////////////
  infoUser(id: string) {
    return this.userModel.findById(id)
  }
}
