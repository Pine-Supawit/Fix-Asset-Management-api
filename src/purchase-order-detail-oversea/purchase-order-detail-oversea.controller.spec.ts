import { Test, TestingModule } from '@nestjs/testing';
import { PurchaseOrderDetailOverseaController } from './purchase-order-detail-oversea.controller';
import { PurchaseOrderDetailOverseaService } from './purchase-order-detail-oversea.service';

describe('PurchaseOrderDetailOverseaController', () => {
  let controller: PurchaseOrderDetailOverseaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PurchaseOrderDetailOverseaController],
      providers: [PurchaseOrderDetailOverseaService],
    }).compile();

    controller = module.get<PurchaseOrderDetailOverseaController>(PurchaseOrderDetailOverseaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
