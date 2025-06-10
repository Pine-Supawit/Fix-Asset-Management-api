import { Test, TestingModule } from '@nestjs/testing';
import { PurchaseRequestController } from './purchase_request.controller';
import { PurchaseRequestService } from './purchase_request.service';

describe('PurchaseRequestController', () => {
  let controller: PurchaseRequestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PurchaseRequestController],
      providers: [PurchaseRequestService],
    }).compile();

    controller = module.get<PurchaseRequestController>(PurchaseRequestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
