import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "./user.repository";
import { FindOneOptions, Repository } from "typeorm";
import { UserDTO } from "./dto/user.dto";
import { User } from "./entity/user.entity";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
       private userRepository: Repository<User>,
    ) {}
    async findByFields(option:FindOneOptions<UserDTO>):Promise<UserDTO|null>{
        return await this.userRepository.findOne(option);
    }
    async save(UserDTO:UserDTO):Promise<UserDTO | null>{
        await this.transformPassword(UserDTO);
        console.log(UserDTO)
        return await this.userRepository.save(UserDTO);
    }

    async transformPassword(user: UserDTO):Promise<void>{
        user.password = await bcrypt.hash(
            user.password,10,
        );
        return Promise.resolve();
    }
}