import { TypeOrmModule } from "@nestjs/typeorm";
import { PurchaseOrder } from "src/purchase-order/entities/purchase_order.entity";
import { PurchaseOrderModule } from "src/purchase-order/purchase_order.module";
import { PurchaseRequest } from "src/purchase-request/entities/purchase_request.entity";
import { PurchaseOrderDetail } from "./entities/purchase-order-detail.entity";
import { PurchaseOrderDetailController } from "./purchase-order-detail.controller";
import { PurchaseOrderDetailService } from "./purchase-order-detail.service";
import { Module } from "@nestjs/common";
import { PurchaseOrderService } from "src/purchase-order/purchase_order.service";
import { PurchaseRequestService } from "src/purchase-request/purchase_request.service";
import { SupplierService } from "src/supplier/supplier.service";
import { Supplier } from "src/supplier/entities/supplier.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([PurchaseOrderDetail, PurchaseOrder, PurchaseRequest], 'off_pp'),
    TypeOrmModule.forFeature([Supplier], 'Ent_db'),
  ],
  controllers: [PurchaseOrderDetailController],
  providers: [PurchaseOrderDetailService, PurchaseOrderService, PurchaseRequestService, SupplierService],
  exports: [PurchaseOrderDetailService],
})
export class PurchaseOrderDetailModule { }
