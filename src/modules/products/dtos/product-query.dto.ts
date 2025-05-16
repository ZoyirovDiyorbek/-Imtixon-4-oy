import { Type } from "class-transformer";
import { IsPositive, IsString, IsIn, IsEnum } from "class-validator";

enum sortField {
    price='price',
    count='count'
}

export class ProductQuery {
    @Type(()=>Number)
    @IsPositive()
    limit:number

    @Type(()=>Number)
    @IsPositive()
    page:number

    @Type(()=>Number)
    @IsPositive()
    maxPrice:number

    @Type(()=>Number)
    @IsPositive()
    minPrice:number;

    @IsString()
    @IsEnum(sortField)
    sortField:sortField;

    @IsString()
    @IsIn(['ASC','DESC'])
    sortOrder:'ASC'|'DESC';
}