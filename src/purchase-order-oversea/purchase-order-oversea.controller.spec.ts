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
        page: 2,
        startDate: '2025-01-01',
        endDate: '2025-03-31',
        limit: 10
    }

    const result = await controller.purchaseOrderOverseaList(mockrequest); 
    expect(service.purchaseOrderOverseaList).toHaveBeenCalledWith(2, '2025-01-01', '2025-03-31', 10);
    expect(result).toBe(mockResult);
  });

  it('should handle missing optional query values gracefully', async () => {
      const mockResult = ['po3'];
      (service.purchaseOrderOverseaList as jest.Mock).mockResolvedValue(mockResult);

      const mockrequest = {}; // no page or dates
      const result = await controller.purchaseOrderOverseaList(mockrequest);
      expect(service.purchaseOrderOverseaList).toHaveBeenCalledWith(undefined, undefined, undefined, undefined);
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


    it('should call service with all valid params', async () => {
      const mockResult = { data: ['poid1'], page: 1, totalInPage: 1, total: 1 };
      service.purchaseOrderOverseaByFilters = jest.fn().mockResolvedValue(mockResult);
      const query = {
        poid: '123',
        purchaseBy: 'john',
        resquestBy: 'jane',
        page: '1',
        startDate: '2025-01-01',
        endDate: '2025-01-31',
        limit: '10',
      };
      const result = await controller.purchaseOrderOverseaByFilters(query as any);
      expect(service.purchaseOrderOverseaByFilters).toHaveBeenCalledWith(123, 'JOHN', 'JANE', 1, 10, '2025-01-01', '2025-01-31');
      expect(result).toBe(mockResult);
    });

    it('should call service with only poid', async () => {
      const mockResult = { data: ['poid2'], page: undefined, totalInPage: 1, total: 1 };
      service.purchaseOrderOverseaByFilters = jest.fn().mockResolvedValue(mockResult);
      const query = { poid: '456' };
      const result = await controller.purchaseOrderOverseaByFilters(query as any);
      expect(service.purchaseOrderOverseaByFilters).toHaveBeenCalledWith(456, undefined, undefined, undefined, undefined, undefined, undefined);
      expect(result).toBe(mockResult);
    });

    it('should throw BadRequestException for invalid poid', async () => {
      const query = { poid: 'not-a-number' };
      await expect(controller.purchaseOrderOverseaByFilters(query as any)).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException for negative poid', async () => {
      const query = { poid: '-5' };
      await expect(controller.purchaseOrderOverseaByFilters(query as any)).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException for missing all filters', async () => {
      const query = { };
      await expect(controller.purchaseOrderOverseaByFilters(query as any)).rejects.toThrow(TypeError);
    });

    it('should propagate service errors', async () => {
      service.purchaseOrderOverseaByFilters = jest.fn().mockRejectedValue(new Error('Service error'));
      const query = { poid: '123' };
      await expect(controller.purchaseOrderOverseaByFilters(query as any)).rejects.toThrow('Service error');
    });
});
