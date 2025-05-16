import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize'
import { ProductModule } from './modules/products';
import { UserModule } from './modules/users';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    SequelizeModule.forRoot({
      dialect:'postgres',
      host:process.env.DB_HOST,
      port:process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
      password:process.env.DB_PASSWORD,
      username:process.env.DB_USER,
      database:process.env.DB_NAME,
      synchronize:true,
      autoLoadModels:true
    }),
    ProductModule,
    UserModule
  ],

})
export class AppModule {}
