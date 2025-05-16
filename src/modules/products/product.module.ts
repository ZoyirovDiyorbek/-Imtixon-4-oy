import { Module } from "@nestjs/common";
import { Product } from "./models/product.model";
import { ProductController } from "./product.controller";
import { FsHelper } from "src/helpers";
import { ProductService } from "./product.service";
import { SequelizeModule } from "@nestjs/sequelize";

@Module({
    imports:[SequelizeModule.forFeature([Product])],
    controllers:[ProductController],
    providers:[FsHelper, ProductService]
})

export class ProductModule {}