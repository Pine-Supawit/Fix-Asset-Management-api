import { Module } from '@nestjs/common';
import { PurchaseRequestDetailService } from './purchase-request-detail.service';
import { PurchaseRequestDetailController } from './purchase-request-detail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseRequestDetail } from './entities/purchase-request-detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PurchaseRequestDetail], 'off_pp')],
  controllers: [PurchaseRequestDetailController],
  providers: [PurchaseRequestDetailService],
})
export class PurchaseRequestDetailModule {}
