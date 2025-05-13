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
import { AssetsModule } from './assets/assets.module';
import { Asset } from './assets/entities/asset.entity';
import { InvoiceModule } from './invoice/invoice.module';
import { Invoice } from './invoice/entities/invoice.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      name: 'off_pp',
      type: 'mssql',
      host: '203.146.94.243',
      port: 1433,
      username: 'samyan',
      password: 'Drowssap1',
      database: 'off_pp',
      // entities: [Product, User],
      entities: [PurchaseOrder, PurchaseRequest, Asset],
      synchronize: false,
      options: {
        encrypt: false
      },
    }),
    TypeOrmModule.forRoot({
      name: 'Endeavour',
      type: 'mssql',
      host: '203.146.94.243',
      port: 1433,
      username: 'samyan',
      password: 'Drowssap1',
      database: 'Endeavour',
      entities: [Invoice],
      synchronize: false,
      options: {
        encrypt: false
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    // ProductsModule,
    // UserModule,
    PurchaseOrderModule,
    PurchaseRequestModule,
    AssetsModule,
    InvoiceModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
