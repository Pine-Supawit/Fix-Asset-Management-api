import { Test, TestingModule } from '@nestjs/testing';
import { PurchaseOrderOverseaController } from './purchase-order-oversea.controller';
import { PurchaseOrderOverseaService } from './purchase-order-oversea.service';
import { BadRequestException } from '@nestjs/common';

describe('PurchaseOrderOverseaController', () => {
  let controller: PurchaseOrderOverseaController;
  let service: PurchaseOrderOverseaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PurchaseOrderOverseaController],
      providers: [
        {
          provide: PurchaseOrderOverseaService,
          useValue: {
            purchaseOrderOverseaList: jest.fn(),
            purchaseOrderOverseaByType: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<PurchaseOrderOverseaController>(PurchaseOrderOverseaController);
    service = module.get<PurchaseOrderOverseaService>(PurchaseOrderOverseaService);
  });
  it('should call service with page as number', async () => {
    const mockResult = ['po1', 'po2'];
    (service.purchaseOrderOverseaList as jest.Mock).mockResolvedValue(mockResult);

    const result = await controller.purchaseOrderOverseaList(5); 
    expect(service.purchaseOrderOverseaList).toHaveBeenCalledWith(5);
    expect(result).toBe(mockResult);
  });

  it('should throw error if page is not a number', async () => {
    await expect(controller.purchaseOrderOverseaList('Non-number' as any)).rejects.toThrow(BadRequestException);
  });

  it('should throw BadRequestException for negative page number', async () => {
    await expect(controller.purchaseOrderOverseaList(-1)).rejects.toThrow(BadRequestException);
});

  it('should throw BadRequestException if page is missing', async () => {
      await expect(controller.purchaseOrderOverseaList(undefined as any)).rejects.toThrow(BadRequestException);
    });

  it('should call service with correct page value', async () => {
    const spy = jest.spyOn(service, 'purchaseOrderOverseaList');
    controller.purchaseOrderOverseaList(3);
    expect(spy).toHaveBeenCalledWith(3);
  });
  
  it('should call service with uppercase type and page as number', async () => {
    const mockResult = ['typeA item1', 'typeA item2'];
    (service.purchaseOrderOverseaByType as jest.Mock).mockResolvedValue(mockResult);

    const result = await controller.purchaseOrderOverseaByType('typea', '2');
    expect(service.purchaseOrderOverseaByType).toHaveBeenCalledWith('TYPEA', 2);
    expect(result).toBe(mockResult);
  });
});