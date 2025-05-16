import { Body, Controller, Post } from "@nestjs/common";
import { UserService } from "./auth.service";
import { LoginDto } from "./dtos/login.dtos";
import { RegisterDto } from "./dtos";

@Controller('user')
export class UserController {
    constructor(private service:UserService){}

    @Post('login')
    async Login(@Body() payload:LoginDto){
        return await this.service.Login(payload)
    }

    @Post('register')
    async Register(@Body() payload:RegisterDto){
        return await this.service.Register(payload)
    }
}