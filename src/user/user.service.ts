import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/createUser.dto';
import { IUser } from './user.interface';
import { Model } from 'mongoose';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<IUser>) {}

  async registerUser(createUserDto: CreateUserDto): Promise<any> {
    const newUser = await new this.userModel(createUserDto);
    return newUser.save();
  }

  async login(userInfo: { email: string; password: string }): Promise<string> {
    const user = await this.userModel.findOne(userInfo);
    console.log('user', user);
    if (!user) {
      // throw new NotFoundException(`Did not found user with #${userInfo} !`)
      return 'invalid input';
    }

    const secretKey = 'secretKey';
    const { _id, name, email, status, is_admin } = user; // Extract relevant properties
    const token = jwt.sign(
      { user_id: _id, name, email, status, is_admin },
      secretKey,
      {
        algorithm: 'HS256',
      },
    );
    console.log('JWT Token:', token);
    return token;
  }
}
