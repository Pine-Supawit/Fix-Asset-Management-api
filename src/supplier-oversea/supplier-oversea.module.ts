import { Module } from '@nestjs/common';
import { SupplierOverseaService } from './supplier-oversea.service';
import { SupplierOverseaController } from './supplier-oversea.controller';

@Module({
  controllers: [SupplierOverseaController],
  providers: [SupplierOverseaService],
})
export class SupplierOverseaModule {}
