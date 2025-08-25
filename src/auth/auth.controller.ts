import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { register } from 'module';
import { UserDTO } from './dto/user.dto';
import { Any } from 'typeorm';
import type { Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}
    @Post('/register')
        async registerAccount(@Req() req:Request , @Body() UserDTO:UserDTO):Promise<any>{
            return await this.authService.registerUser(UserDTO);
    }
    @Post('login')
    async login(@Body() UserDTO:UserDTO,@Res()res:Response):Promise<any>{
        const jwt = await this.authService.validateUser(UserDTO);
        res.setHeader('Authorization','Bearer '+jwt?.accessToken);
        return res.json(jwt);
    }
}
