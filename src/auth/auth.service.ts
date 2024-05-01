import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UserEntity } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthRespDto } from './dto/auth-resp.dto';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
        private jwtService: JwtService
    ) {}

    async register(payload: RegisterDto): Promise<AuthRespDto> {

        if (payload.password != payload.rePassword) {
            throw new HttpException('rePassword is not matched', HttpStatus.BAD_REQUEST);
        }

        const user = await this.userService.findOneByUsername(payload.username);
        if (user) {
            throw new HttpException('Username existed', HttpStatus.BAD_REQUEST);
        }

        const salt = await bcrypt.genSalt();
        const secret = await bcrypt.hash(Date.now().toString(), salt);
        const hashPassword = await bcrypt.hash(payload.password + secret, salt);

        const createdUser = await this.userService.create(payload.username, hashPassword, secret);

        return {
            accessToken: await this.createAccessToken(createdUser)
        }
    }

    async login(payload: LoginDto): Promise<AuthRespDto> {

        const user = await this.userService.findOneByUsername(payload.username);
        if (
            !user ||
            !(await bcrypt.compare(payload.password + user.secret, user.password))
        ) {
            throw new UnauthorizedException();
        }
        
        return {
            accessToken: await this.createAccessToken(user)
        }

    }

    async createAccessToken(user: UserEntity): Promise<string> {
        const payload = { id: user.id, username: user.username };

        return this.jwtService.sign(payload)
    }
}
