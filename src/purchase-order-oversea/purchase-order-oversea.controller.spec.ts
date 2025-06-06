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
     const mockrequest = {
        page: '2',
        startDate: '2025-01-01',
        endDate: '2025-03-31',
    }

    const result = await controller.purchaseOrderOverseaList(mockrequest); 
    expect(service.purchaseOrderOverseaList).toHaveBeenCalledWith(2, '2025-01-01', '2025-03-31');
    expect(result).toBe(mockResult);
  });

  it('should handle missing optional query values gracefully', async () => {
      const mockResult = ['po3'];
      (service.purchaseOrderOverseaList as jest.Mock).mockResolvedValue(mockResult);

      const mockrequest = {}; // no page or dates
      const result = await controller.purchaseOrderOverseaList(mockrequest);
      expect(service.purchaseOrderOverseaList).toHaveBeenCalledWith(undefined, undefined, undefined);
      expect(result).toBe(mockResult);
    });

    it('should call service with uppercase type and validated inputs', async () => {
      const mockResult = ['typeA item1', 'typeA item2'];
      (service.purchaseOrderOverseaByType as jest.Mock).mockResolvedValue(mockResult);

      const query = {
        type: 'asset',
        page: '1',
        startDate: '2025-01-01',
        endDate: '2025-01-31',
      };

      const result = await controller.purchaseOrderOverseaByType(query as any);
      expect(service.purchaseOrderOverseaByType).toHaveBeenCalledWith(
        'ASSET',
        1,
        '2025-01-01',
        '2025-01-31'
      );
      expect(result).toBe(mockResult);
    });

    it('should throw BadRequestException for invalid type', async () => {
      const query = {
        type: '',
        page: '1',
        startDate: '2025-01-01',
        endDate: '2025-01-31',
      };

      await expect(controller.purchaseOrderOverseaByType(query as any)).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException for invalid page number', async () => {
      const query = {
        type: 'non-asset',
        page: '-3',
        startDate: '2025-01-01',
        endDate: '2025-01-31',
      };

      await expect(controller.purchaseOrderOverseaByType(query as any)).rejects.toThrow(BadRequestException);
    });
});