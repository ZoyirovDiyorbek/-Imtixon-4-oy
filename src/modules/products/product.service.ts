import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Product } from "./models/product.model";
import { CreateProductDto } from "./dtos";
import { ProductQuery } from "./dtos/product-query.dto";
import { Op } from "sequelize"

@Injectable()
export class ProductService {
    constructor(@InjectModel(Product) private productModel: typeof Product){}

    async getAll(query:ProductQuery){
        let filter:any={}
        if(query.maxPrice){
            filter.price={
                ...filter.price,
                [Op.lte]:query.maxPrice
            }
        }
        if(query.maxPrice){
            filter.price = {
                ...filter.price,
                [Op.gte]:query.minPrice
            }
        }

        const products = await this.productModel.findAll({
            limit:query.limit|10,
            offset:(query.page-1)*query.limit|0,
            order:query.sortField ? [[query.sortField,query.sortOrder||'DESC']] : [['id',"ASC"]],
            where:{...filter}
        })
        return {
            message:"Success!",
            data:products
        }
    }

    async createNew(payload:CreateProductDto){
        const newProduct = await this.productModel.create({
            name:payload.name,
            price:payload.price,
            count:payload.count,
        })
        return {
            message:"Successfully created!",
            data:newProduct
        }
    }

    async updateProduct(payload:CreateProductDto,id:number){
        const founded = await this.productModel.findByPk(id)
        if(!founded?.dataValues){
            throw new NotFoundException("Product not found!")
        }
        const updated = await this.productModel.update({
                    name:payload.name||founded.dataValues.name,
                    count:payload.count||founded.dataValues.count,
                    price:payload.price||founded.dataValues.price
                },
                {where:{id:id}})
        return {
            message:"Successfully updated!",
            data:updated
        }
    }

    async deleteProduct(id:number){
        const founded = await this.productModel.findByPk(id)
        if(!founded?.dataValues){
            throw new NotFoundException("Product not found!")
        }
        await this.productModel.destroy({where:{id:id}})
        return {
            message:"Successfully deleted!"
        }
    }
}