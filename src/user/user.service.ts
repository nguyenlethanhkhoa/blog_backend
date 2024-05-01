import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';
import { FindOneOptions } from 'typeorm';

@Injectable()
export class UserService {

    constructor(
        private readonly userRepository: UserRepository,
    ) { }

    async findAll(): Promise<[UserEntity[], number]> {

        return await this.userRepository.findAndCount();
    }

    async findOneById(userId: number): Promise<UserEntity> {
        return await this.userRepository.findOne({
            where: { id: userId }
        });
    }

    async findOneByUsername(username: string): Promise<UserEntity> {

        return await this.userRepository.findOne({
            where: { username },
            select: { password: true, secret: true}
        });
    }

    async create(username: string, password: string, secret: string): Promise<UserEntity> {
        return await this.userRepository.save({
            username,
            secret,
            password
        });
    }

    async deleteOne(id: number): Promise<void> {
        await this.userRepository.delete(id);
    }
}
