import { Module } from '@nestjs/common';
import { PurchaseOrderService } from './purchase_order.service';
import { PurchaseOrderController } from './purchase_order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseOrder } from './entities/purchase_order.entity';
import { PurchaseOrderDetailService } from 'src/purchase-order-detail/purchase-order-detail.service';
import { PurchaseOrderDetail } from 'src/purchase-order-detail/entities/purchase-order-detail.entity';
import { PurchaseRequest } from 'src/purchase_request/entities/purchase_request.entity';
import { PurchaseRequestService } from 'src/purchase_request/purchase_request.service';
import { Supplier } from 'src/supplier/entities/supplier.entity';
import { SupplierService } from 'src/supplier/supplier.service';
import { Log } from 'src/log/entities/log.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PurchaseOrder, PurchaseOrderDetail, PurchaseRequest], 'off_pp'),
    TypeOrmModule.forFeature([Supplier], 'Ent_db'),
  ],
  controllers: [PurchaseOrderController],
  providers: [PurchaseOrderService, PurchaseOrderDetailService, PurchaseRequestService, SupplierService],
  exports: [PurchaseOrderService],
})
export class PurchaseOrderModule { }
