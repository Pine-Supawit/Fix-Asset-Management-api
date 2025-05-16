import { Injectable } from '@nestjs/common';
import { CreatePurchaseOrderDetailDto } from './dto/create-purchase-order-detail.dto';
import { UpdatePurchaseOrderDetailDto } from './dto/update-purchase-order-detail.dto';

@Injectable()
export class PurchaseOrderDetailService {
  create(createPurchaseOrderDetailDto: CreatePurchaseOrderDetailDto) {
    return 'This action adds a new purchaseOrderDetail';
  }

  findAll() {
    return `This action returns all purchaseOrderDetail`;
  }

  findOne(id: number) {
    return `This action returns a #${id} purchaseOrderDetail`;
  }

  update(id: number, updatePurchaseOrderDetailDto: UpdatePurchaseOrderDetailDto) {
    return `This action updates a #${id} purchaseOrderDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} purchaseOrderDetail`;
  }
}
