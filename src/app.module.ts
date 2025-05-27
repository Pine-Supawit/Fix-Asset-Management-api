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
import { SupplierModule } from './supplier/supplier.module';
import { Supplier } from './supplier/entities/supplier.entity';
import { AssetCheckModule } from './asset_check/asset_check.module';
import { AssetChecklist } from './asset_check/entities/asset_check.entity';
import { PurchaseRequestDetailModule } from './purchase-request-detail/purchase-request-detail.module';
import { PurchaseRequestDetail } from './purchase-request-detail/entities/purchase-request-detail.entity';
import { PurchaseOrderDetailModule } from './purchase-order-detail/purchase-order-detail.module';
import { PurchaseOrderDetail } from './purchase-order-detail/entities/purchase-order-detail.entity';
import { PurchaseOrderOversea } from './purchase-order-oversea/entities/purchase-order-oversea.entity';
import { PurchaseOrderOverseaModule } from './purchase-order-oversea/purchase-order-oversea.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      name: process.env.DATABASE_NAME_3,
      type: 'mssql',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME_3,
      entities: [User, PurchaseOrder, PurchaseRequest, PurchaseRequestDetail, PurchaseOrderDetail, Asset, AssetChecklist],
      synchronize: false,
      options: {
        encrypt: false
      },
    }),
    TypeOrmModule.forRoot({
      name: process.env.DATABASE_NAME_2,
      type: 'mssql',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME_2,
      // entities: [Invoice, Product],
      entities:[PurchaseOrderOversea],
      synchronize: false,
      options: {
        encrypt: false
      },
    }),
    TypeOrmModule.forRoot({
      name: process.env.DATABASE_NAME_1,
      type: 'mssql',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME_1,
      entities: [Supplier],
      synchronize: false,
      options: {
        encrypt: false
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    UserModule,
    PurchaseOrderModule,
    PurchaseOrderDetailModule,
    PurchaseRequestModule,
    PurchaseRequestDetailModule,
    AssetsModule,
    AssetCheckModule,
    // ProductsModule,
    // InvoiceModule,
    SupplierModule,
    PurchaseOrderOverseaModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
