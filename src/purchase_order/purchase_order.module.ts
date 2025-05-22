import { Module } from '@nestjs/common';
import { PurchaseOrderService } from './purchase_order.service';
import { PurchaseOrderController } from './purchase_order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseOrder } from './entities/purchase_order.entity';
import { PurchaseOrderDetailService } from 'src/purchase-order-detail/purchase-order-detail.service';
import { PurchaseOrderDetail } from 'src/purchase-order-detail/entities/purchase-order-detail.entity';
import { PurchaseRequest } from 'src/purchase_request/entities/purchase_request.entity';
import { PurchaseRequestService } from 'src/purchase_request/purchase_request.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([PurchaseOrder, PurchaseOrderDetail, PurchaseRequest], 'off_pp'),
  ],
  controllers: [PurchaseOrderController],
  providers: [PurchaseOrderService, PurchaseOrderDetailService, PurchaseRequestService],
})
export class PurchaseOrderModule { }
