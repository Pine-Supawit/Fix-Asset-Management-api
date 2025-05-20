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

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      name: 'off_pp',
      type: 'mssql',
      host: '203.146.94.243',
      port: 1433,
      username: 'samyan',
      password: 'Drowssap1',
      database: 'off_pp',
      entities: [User, PurchaseOrder, PurchaseRequest, PurchaseRequestDetail, PurchaseOrderDetail, Asset, AssetChecklist],
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
      // entities: [Invoice, Product],
      synchronize: false,
      options: {
        encrypt: false
      },
    }),
    TypeOrmModule.forRoot({
      name: 'Ent_db',
      type: 'mssql',
      host: '203.146.94.243',
      port: 1433,
      username: 'samyan',
      password: 'Drowssap1',
      database: 'Ent_db',
      // entities: [Supplier],
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
    UserModule,
    PurchaseOrderModule,
    PurchaseRequestModule,
    PurchaseRequestDetailModule,
    PurchaseOrderDetailModule,
    AssetsModule,
    // InvoiceModule,
    // SupplierModule,
    AssetCheckModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
