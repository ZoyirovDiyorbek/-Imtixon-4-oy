import { Column, DataType, Table, Model } from "sequelize-typescript";

@Table({tableName:'product',timestamps:true})
export class Product extends Model{
    @Column({type:DataType.TEXT})
    name:string;

    @Column({type:DataType.SMALLINT})
    price:number;

    @Column({type:DataType.SMALLINT})
    count:number;
}