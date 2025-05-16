import { Module } from '@nestjs/common';
import { PurchaseOrderDetailService } from './purchase-order-detail.service';
import { PurchaseOrderDetailController } from './purchase-order-detail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseOrderDetail } from './entities/purchase-order-detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PurchaseOrderDetail], 'off_pp')],
  controllers: [PurchaseOrderDetailController],
  providers: [PurchaseOrderDetailService],
})
export class PurchaseOrderDetailModule { }
