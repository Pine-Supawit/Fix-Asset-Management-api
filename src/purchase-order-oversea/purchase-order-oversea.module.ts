import { Module } from '@nestjs/common';
import { PurchaseOrderOverseaService } from './purchase-order-oversea.service';
import { PurchaseOrderOverseaController } from './purchase-order-oversea.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseOrderOversea } from './entities/purchase-order-oversea.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PurchaseOrderOversea], 'Endeavour')],
  controllers: [PurchaseOrderOverseaController],
  providers: [PurchaseOrderOverseaService],
  exports: [PurchaseOrderOverseaService],
})
export class PurchaseOrderOverseaModule {}
