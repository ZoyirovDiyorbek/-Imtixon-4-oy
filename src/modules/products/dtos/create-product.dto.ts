import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsPositive, IsString } from "class-validator";

export class CreateProductDto {
    @ApiProperty({required:true})
    @IsString()
    name:string;

    @ApiProperty({required:true})
    @Type(()=>Number)
    @IsPositive()
    price:number;

    @ApiProperty({required:true})
    @Type(()=>Number)
    @IsPositive()
    count:number;
}