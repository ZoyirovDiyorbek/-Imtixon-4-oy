import { ApiProperty } from "@nestjs/swagger";
import { IsString,IsEmail, MinLength, MaxLength } from "class-validator";

export class RegisterDto {
    @ApiProperty({required:true})
    @IsString()
    name:string;

    @ApiProperty({required:true})
    @IsEmail()
    email:string;

    @ApiProperty({required:true})
    @IsString()
    @MinLength(4)
    @MaxLength(12)
    password:string;
}