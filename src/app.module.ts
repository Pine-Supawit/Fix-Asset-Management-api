import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './products/entities/product.entity';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { PurchaseOrderModule } from './purchase_order/purchase_order.module';
import { PurchaseOrder } from './purchase_order/entities/purchase_order.entity';
import { PurchaseRequestModule } from './purchase_request/purchase_request.module';
import { PurchaseRequest } from './purchase_request/entities/purchase_request.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: '203.146.94.243',
      port: 1433,
      username: 'samyan',
      password: 'Drowssap1',
      database: 'off_pp',
      // entities: [Product, User],
      entities: [PurchaseOrder, PurchaseRequest],
      // synchronize: true,
      options: {
        encrypt: false
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ProductsModule,
    UserModule,
    PurchaseOrderModule,
    PurchaseRequestModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
