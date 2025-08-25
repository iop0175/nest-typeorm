import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './dto/user.dto';
import { promises } from 'dns';
import { User } from './entity/user.entity';
import * as bcrypt from 'bcrypt';
import { Payload } from './security/payload.interface';
import { access } from 'fs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }
    async registerUser(newUser: UserDTO): Promise<UserDTO | null> {
        let userFind: UserDTO | null = await this.userService.findByFields({
            where: { username: newUser.username }
        });
        if (userFind) {
            throw new HttpException('Username aleady used!', HttpStatus.BAD_REQUEST);
        }
        return await this.userService.save(newUser);
    }

    async validateUser(UserDTO: UserDTO): Promise<{accessToken} | null> {
        let userFind:User|null = await this.userService.findByFields({
            where: { username: UserDTO.username }
        });
        if (!userFind) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const validatePassword = await bcrypt.compare(UserDTO.password, userFind.password)
        if (!userFind || !validatePassword) {
            throw new UnauthorizedException();
        }
        const Payload:Payload={
            id:userFind.id,username:userFind.username
        }
        return {
            accessToken:this.jwtService.sign(Payload)
        };
    }
}
