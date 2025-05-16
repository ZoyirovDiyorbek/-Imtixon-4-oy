import { Module } from "@nestjs/common";
import { UserService } from "./auth.service";
import { UserController } from "./auth.controller";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { JwtHelper } from "src/helpers/jwt.helper";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./models";

@Module({
    imports:[ConfigModule.forRoot({
        isGlobal:true
    }),
    SequelizeModule.forFeature([User]),
        JwtModule.register({
            global:true,
            secret:process.env.ACCESS_TOKEN_SECRET,
            signOptions:{
                expiresIn:process.env.ACCESS_TOKEN_TIME ? parseInt(process.env.ACCESS_TOKEN_TIME):'1h'
            }
        })],
    providers:[UserService,JwtHelper],
    controllers:[UserController]
})

export class AuthModel {};