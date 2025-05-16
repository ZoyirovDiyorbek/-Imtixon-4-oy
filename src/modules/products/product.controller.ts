import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { ProductService } from "./product.service";
import { CreateProductDto } from "./dtos";
import { ProductQuery } from "./dtos/product-query.dto";
import { CheckAuth } from "src/guards/check.auth.guard";
import { CheckRoles } from "src/guards/check.role.guard";
import { ApiBearerAuth } from "@nestjs/swagger";
import { Protected } from "src/decorators/protected.decorator";
import { Roles } from "src/decorators/role.decorator";
import { UserRoles } from "../users";

@UseGuards(CheckAuth,CheckRoles)
@Controller('product')
export class ProductController{
    constructor(private service: ProductService){}

    @ApiBearerAuth()
    @Get()
    @Roles([UserRoles.ADMIN,UserRoles.USER])
    async getAll(@Query() query:ProductQuery){
        return await this.service.getAll(query)
    }

    @ApiBearerAuth()
    @Protected(true)
    @Roles([UserRoles.ADMIN,UserRoles.USER])
    @Post()
    async createNew(@Body() payload:CreateProductDto){
        return await this.service.createNew(payload)
    }

    @ApiBearerAuth()
    @Patch(':id')
    @Roles([UserRoles.ADMIN,UserRoles.USER])
    async updateProduct(@Param('id',ParseIntPipe) id:number,
                @Body()  payload:CreateProductDto){
        return await this.service.updateProduct(payload,id)
    }

    @ApiBearerAuth()
    @Delete(':id')
    @Roles([UserRoles.ADMIN,UserRoles.USER])
    async deleteProduct(@Param('id',ParseIntPipe) id:number){
        return await this.service.deleteProduct(id)
    }
}