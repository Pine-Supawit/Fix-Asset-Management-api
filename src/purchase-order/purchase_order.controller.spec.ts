import { Test, TestingModule } from '@nestjs/testing';
import { PurchaseOrderController } from './purchase_order.controller';
import { PurchaseOrderService } from './purchase_order.service';

describe('PurchaseOrderController', () => {
  let controller: PurchaseOrderController;
  let service: PurchaseOrderService;

  const mockPurchaseOrderService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PurchaseOrderController],
      providers: [
        {
          provide: PurchaseOrderService,
          useValue: mockPurchaseOrderService,
        },
      ],
    }).compile();

    controller = module.get<PurchaseOrderController>(PurchaseOrderController);
    service = module.get<PurchaseOrderService>(PurchaseOrderService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call service.findAll with correct params', async () => {
    const query = { page: 1, limit: 10 };
    const result = { data: [], pagination: { total: 0 } };

    mockPurchaseOrderService.findAll.mockResolvedValue(result);

    const response = await controller.findAll(query as any);
    expect(service.findAll).toHaveBeenCalledWith(query);
    expect(response).toEqual(result);
  });
});
