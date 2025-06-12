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
  it('should call service with only POID', async () => {
    const mockResult = { data: ['po1'], page: 1, totalInPage: 1, total: 1 };
    (service.purchaseOrderOverseaList as jest.Mock).mockResolvedValue(mockResult);
    const dto = { POID: 123 };
    const result = await controller.purchaseOrderOverseaList(dto as any);
    expect(service.purchaseOrderOverseaList).toHaveBeenCalledWith(123, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
    expect(result).toBe(mockResult);
  });

  it('should call service with only Category', async () => {
    const mockResult = { data: ['po2'], page: 1, totalInPage: 1, total: 1 };
    (service.purchaseOrderOverseaList as jest.Mock).mockResolvedValue(mockResult);
    const dto = { Category: 'Asset' };
    const result = await controller.purchaseOrderOverseaList(dto as any);
    expect(service.purchaseOrderOverseaList).toHaveBeenCalledWith(undefined, 'ASSET', undefined, undefined, undefined, undefined, undefined, undefined, undefined);
    expect(result).toBe(mockResult);
  });

  // it('should call service with only PoType', async () => {
  //   const mockResult = { data: ['poType'], page: 1, totalInPage: 1, total: 1 };
  //   (service.purchaseOrderOverseaList as jest.Mock).mockResolvedValue(mockResult);
  //   const dto = { PoType: 'IMPORT' };
  //   const result = await controller.purchaseOrderOverseaList(dto as any);
  //   expect(service.purchaseOrderOverseaList).toHaveBeenCalledWith(undefined, undefined, '', undefined, undefined, undefined, undefined, undefined, undefined);
  //   expect(result).toBe(mockResult);
  // });

  it('should call service with only PurchaseBy', async () => {
    const mockResult = { data: ['po3'], page: 1, totalInPage: 1, total: 1 };
    (service.purchaseOrderOverseaList as jest.Mock).mockResolvedValue(mockResult);
    const dto = { PurchaseBy: 'john' };
    const result = await controller.purchaseOrderOverseaList(dto as any);
    expect(service.purchaseOrderOverseaList).toHaveBeenCalledWith(undefined, undefined, undefined, 'JOHN', undefined, undefined, undefined, undefined, undefined);
    expect(result).toBe(mockResult);
  });

  it('should call service with only RequestBy', async () => {
    const mockResult = { data: ['po4'], page: 1, totalInPage: 1, total: 1 };
    (service.purchaseOrderOverseaList as jest.Mock).mockResolvedValue(mockResult);
    const dto = { RequestBy: 'jane' };
    const result = await controller.purchaseOrderOverseaList(dto as any);
    expect(service.purchaseOrderOverseaList).toHaveBeenCalledWith(undefined, undefined, undefined, undefined, 'JANE', undefined, undefined, undefined, undefined);
    expect(result).toBe(mockResult);
  });

  it('should call service with pagination and date filters', async () => {
    const mockResult = { data: ['po5'], page: 2, totalInPage: 1, total: 1 };
    (service.purchaseOrderOverseaList as jest.Mock).mockResolvedValue(mockResult);
    const dto = { page: 2, limit: 10, startDate: '2025-01-01', endDate: '2025-03-31' };
    const result = await controller.purchaseOrderOverseaList(dto as any);
    expect(service.purchaseOrderOverseaList).toHaveBeenCalledWith(undefined, undefined, undefined, undefined, undefined, 2, 10, '2025-01-01', '2025-03-31');
    expect(result).toBe(mockResult);
  });

  it('should return empty result if service returns no data', async () => {
    const mockResult = { data: [], page: -1, totalInPage: -1, total: -1 };
    (service.purchaseOrderOverseaList as jest.Mock).mockResolvedValue(mockResult);
    const dto = { POID: 999 };
    const result = await controller.purchaseOrderOverseaList(dto as any);
    expect(result).toEqual(mockResult);
  });

  it('should throw error if more than one filter is provided', async () => {
    (service.purchaseOrderOverseaList as jest.Mock).mockImplementation(() => { throw new Error('Only one of poid, purchaseOfficer, or requestOfficer can be provided at a time.'); });
    const dto = { POID: 1, PurchaseBy: 'john' };
    await expect(controller.purchaseOrderOverseaList(dto as any)).rejects.toThrow('Only one of poid, purchaseOfficer, or requestOfficer can be provided at a time.');
  });

  it('should propagate service errors', async () => {
    (service.purchaseOrderOverseaList as jest.Mock).mockRejectedValue(new Error('Service error'));
    const dto = { POID: 1 };
    await expect(controller.purchaseOrderOverseaList(dto as any)).rejects.toThrow('Service error');
  });
});
