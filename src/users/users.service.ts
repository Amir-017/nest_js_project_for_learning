import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './Schemas/user.scham';
import * as bcrypt from 'bcrypt';
import { log } from 'console';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel:Model<User>) {}
 async create(createUserDto: CreateUserDto) {

const hashPassword = await bcrypt.hash(createUserDto.password, 10);

  const user = await this.userModel.create({ ...createUserDto, password: hashPassword });
  return user;
  }

  findAll() {
    log('findAll called');
    return this.userModel.find();
  }

  findOne(id: string) {
    log(id);
    // log('findOne called with id:');
    return this.userModel.findById(id);
  }   

  async update(id: string, updateUserDto: UpdateUserDto) {
    if(updateUserDto.password){
      updateUserDto.password = bcrypt.hashSync(updateUserDto.password, 10);
    }

    // if(Object.keys(updateUserDto).length === 0){
    //   return this.userModel.findById(id);
    // }
  // const  isEmailExist = await this.userModel.findOne({email:updateUserDto.email})
  //   if(isEmailExist){
  //     throw new BadRequestException('Email already exists');
  //   }
    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
  }

  remove(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }

  infoUser(id:string){
    return this.userModel.findById(id)
  }
}
