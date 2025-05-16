import { ApiProperty } from "@nestjs/swagger";
import { IsString,IsEmail, MinLength, MaxLength } from "class-validator";

export class LoginDto {
    @ApiProperty({required:true})
    @IsEmail()
    email:string;

    @ApiProperty({required:true})
    @IsString()
    @MinLength(4)
    @MaxLength(12)
    password:string;
}