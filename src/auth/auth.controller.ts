import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { register } from 'module';
import { UserDTO } from './dto/user.dto';
import { Any } from 'typeorm';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}
    @Post('/register')
        async registerAccount(@Req() req:Request , @Body() UserDTO:UserDTO):Promise<any>{
            return await this.authService.registerUser(UserDTO);
    }
    @Post('login')
    async login(@Body() UserDTO:UserDTO):Promise<any>{
        return await this.authService.validateUser(UserDTO);
    }
}
