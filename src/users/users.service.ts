import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {

    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

    async create(createUserDto: CreateUserDto): Promise<User> {//create a new user
        const { email, password } = createUserDto; // Destructuring the createUserDto object 
        // verificar si el usuario ya existe
        const existingUser = await this.userModel.findOne({ email });
        if (existingUser) {
            throw new ConflictException('User already exists with this email');
        }
        // encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);
        // crear y guardar el usuario
        const newUser = new this.userModel({
            ...createUserDto,
            password: hashedPassword
        });
        return newUser.save();
    }
    // encontrar por email
    async findByEmail(email: string): Promise<User | null> {
        return this.userModel.findOne({ email }).exec();
    }
    // encontrar por id
    async findById(id: string): Promise<User | null> {
        return this.userModel.findById(id).exec();
    }
}
