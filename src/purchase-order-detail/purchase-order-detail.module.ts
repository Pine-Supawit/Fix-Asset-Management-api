import { Module } from '@nestjs/common';
import { PurchaseOrderDetailService } from './purchase-order-detail.service';
import { PurchaseOrderDetailController } from './purchase-order-detail.controller';

@Module({
  controllers: [PurchaseOrderDetailController],
  providers: [PurchaseOrderDetailService],
})
export class PurchaseOrderDetailModule {}
