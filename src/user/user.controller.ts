import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {

    constructor(
        private readonly userService: UserService
    ) {}

    @Get()
    async findAll(): Promise<[UserEntity[], number]> {
        return await this.userService.findAll();
    }

    @Delete(':id')
    async deleteOne(@Param('id') id: number): Promise<void> {
        await this.userService.deleteOne(id);
    }
    
}
