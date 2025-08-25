import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { User } from './entity/user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[
    JwtModule.register({
      secret:'SECRET_KEY',
      signOptions:{expiresIn:'300s'},
    })
    ,TypeOrmModule.forFeature([User])],
  exports:[TypeOrmModule],
  controllers: [AuthController],
  providers: [AuthService,UserService]
})
export class AuthModule {}
