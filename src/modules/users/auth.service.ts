import { BadRequestException, ConflictException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./models/auth.model";
import { RegisterDto } from "./dtos";
import * as bcrypt from "bcryptjs"
import { LoginDto } from "./dtos/login.dtos";
import { JwtHelper } from "src/helpers/jwt.helper";

@Injectable()
export class UserService {
    constructor(@InjectModel(User) private UserModel: typeof User,
        private JwtHelper:JwtHelper){}

    async Register(payload:RegisterDto){
        let foundedUser = await this.UserModel.findOne({where:{email:payload.email}})
        if(foundedUser?.dataValues){
            throw new ConflictException('User with this email is already exist!')
        }

        let newUser = await this.UserModel.create({
            name:payload.name,
            email:payload.email,
            password:bcrypt.hashSync(payload.password)
        })

        return {
            message:"Successfully registered!",
            data:newUser
        }
    }

    async Login(payload:LoginDto){
        let foundedUser = await this.UserModel.findOne({where:{email:payload.email}})
        if(!foundedUser?.dataValues){
            throw new ConflictException('User with this email does not exists!')
        }

        let isMatch = bcrypt.compare(payload.password,foundedUser.dataValues.password)

        if(!isMatch){
            throw new BadRequestException("Invalid password!")
        }

        const token = await this.JwtHelper.generateToken({id:foundedUser.dataValues.id,role:foundedUser.dataValues.role})
        return {
            message:"Successfully logged!",
            token:token
        }
    }
}