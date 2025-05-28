import { Module } from '@nestjs/common';
import { PurchaseOrderDetailOverseaService } from './purchase-order-detail-oversea.service';
import { PurchaseOrderDetailOverseaController } from './purchase-order-detail-oversea.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseOrderDetailOversea } from './entities/purchase-order-detail-oversea.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PurchaseOrderDetailOversea], 'Endeavour')],
  controllers: [PurchaseOrderDetailOverseaController],
  providers: [PurchaseOrderDetailOverseaService],
  exports: [PurchaseOrderDetailOverseaService],
})
export class PurchaseOrderDetailOverseaModule {}
