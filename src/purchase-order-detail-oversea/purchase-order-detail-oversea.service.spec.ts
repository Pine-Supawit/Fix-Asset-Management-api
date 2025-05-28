import { Test, TestingModule } from '@nestjs/testing';
import { PurchaseOrderDetailOverseaService } from './purchase-order-detail-oversea.service';
import { DataSource } from 'typeorm';
import { getDataSourceToken, getRepositoryToken } from '@nestjs/typeorm';
import { PurchaseOrderDetailOversea } from './entities/purchase-order-detail-oversea.entity';

describe('PurchaseOrderDetailOverseaService', () => {
  let service: PurchaseOrderDetailOverseaService;
  let dataSourceMock: Partial<DataSource>;
  let loggerMock: any;

  beforeEach(async () => {
    dataSourceMock = {
      query: jest.fn(),
    };
    loggerMock = {
      log: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PurchaseOrderDetailOverseaService,
        {
          provide: getRepositoryToken(PurchaseOrderDetailOversea, 'Endeavour'),
          useValue: {},
        },
        {
          provide: getDataSourceToken('Endeavour'),
          useValue: dataSourceMock,
        },
      ],
    }).compile();
    service = module.get<PurchaseOrderDetailOverseaService>(PurchaseOrderDetailOverseaService);
    (service as any).logger = loggerMock;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return detail data when found', async () => {
    const mockResult = [
      {
        Companyname: 'Pine-Pacific Corporation Limited',
        CategoryOfAsset: 'Asset',
        PuchasingOfficer: 'John',
        requestBy: 'Jane',
        purchasePurpose: 'Purpose',
        procurementMethod: true,
        productID: '50001',
        productName: 'ProductA',
        supplierName: 'SupplierA',
        quantity: 10,
        amount: 1000,
        invoiceNum: 'INV001',
        invoiceDate: '2024-01-01T00:00:00.000Z',
      },
    ];
    (dataSourceMock.query as jest.Mock).mockResolvedValueOnce(mockResult);
    const result = await service.purchaseOrderDetailOversea(1, 50001, 1);
    expect(result).toEqual(mockResult);
    expect(loggerMock.log).toHaveBeenCalledWith('Purchase order details fetched successfully');
    expect(loggerMock.log).toHaveBeenCalledWith({ data: mockResult });
  });

  it('should return empty data if no details found', async () => {
    (dataSourceMock.query as jest.Mock).mockResolvedValueOnce([]);
    const result = await service.purchaseOrderDetailOversea(1, 50001, 1);
    expect(result).toEqual({ data: [], pageNo: -1, total: -1 });
    expect(loggerMock.warn).toHaveBeenCalledWith('No purchase order details found for the given criteria');
  });

  it('should throw an error if query fails', async () => {
    (dataSourceMock.query as jest.Mock).mockRejectedValueOnce(new Error('DB error'));
    await expect(service.purchaseOrderDetailOversea(1, 50001, 1)).rejects.toThrow('Error fetching purchase orders details');
    expect(loggerMock.error).toHaveBeenCalledWith('Error fetching purchase orders details', expect.any(Error));
  });

  it('should throw an error if poid is missing', async () => {
    // @ts-ignore
    await expect(service.purchaseOrderDetailOversea(undefined, 50001, 1)).rejects.toThrow();
  });

  it('should throw an error if productID is missing', async () => {
    // @ts-ignore
    await expect(service.purchaseOrderDetailOversea(1, undefined, 1)).rejects.toThrow();
  });

  it('should throw an error if productNo is missing', async () => {
    // @ts-ignore
    await expect(service.purchaseOrderDetailOversea(1, 50001, undefined)).rejects.toThrow();
  });

  it('should throw an error if all params are missing', async () => {
    // @ts-ignore
    await expect(service.purchaseOrderDetailOversea()).rejects.toThrow();
  });

    it('should throw an error if poid is invalid', async () => {
    await expect(service.purchaseOrderDetailOversea('invalid' as any, 50001, 1)).rejects.toThrow();
  });

  it('should throw an error if productID is invalid', async () => {
    await expect(service.purchaseOrderDetailOversea(1, 'invalid' as any, 1)).rejects.toThrow();
    await expect(service.purchaseOrderDetailOversea(1, null as any, 1)).rejects.toThrow();
  });

  it('should throw an error if productNo is invalid', async () => {
    await expect(service.purchaseOrderDetailOversea(1, 50001, 'invalid' as any)).rejects.toThrow();
    await expect(service.purchaseOrderDetailOversea(1, 50001, null as any)).rejects.toThrow();
  });

   it('should throw an error if poid is null', async () => {
    await expect(service.purchaseOrderDetailOversea(null as any, 50001, 1)).rejects.toThrow();
  });

  it('should throw an error if productID is null', async () => {
    await expect(service.purchaseOrderDetailOversea(1, null as any, 1)).rejects.toThrow();
  });

  it('should throw an error if productNo is null', async () => {
    await expect(service.purchaseOrderDetailOversea(1, 50001, null as any)).rejects.toThrow();
  });
});
