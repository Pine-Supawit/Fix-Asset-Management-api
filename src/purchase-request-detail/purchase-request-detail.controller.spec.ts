import { Test, TestingModule } from '@nestjs/testing';
import { PurchaseRequestDetailController } from './purchase-request-detail.controller';
import { PurchaseRequestDetailService } from './purchase-request-detail.service';

describe('PurchaseRequestDetailController', () => {
  let controller: PurchaseRequestDetailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PurchaseRequestDetailController],
      providers: [PurchaseRequestDetailService],
    }).compile();

    controller = module.get<PurchaseRequestDetailController>(PurchaseRequestDetailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
