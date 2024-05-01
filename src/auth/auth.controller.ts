import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UserEntity } from 'src/user/user.entity';
import { AuthRespDto } from './dto/auth-resp.dto';
import { AuthGuard } from './auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';


@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) { }

    @Post('register')
    async register(
        @Body() payload: RegisterDto
    ): Promise<AuthRespDto> {
        return await this.authService.register(payload);
    }

    @Post('login')
    async login(
        @Body() payload: LoginDto
    ): Promise<AuthRespDto> {
        return await this.authService.login(payload);
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }

}
