import { Test, TestingModule } from '@nestjs/testing';
import { PurchaseOrderOverseaService } from './purchase-order-oversea.service';
import { DataSource } from 'typeorm';
import { getDataSourceToken, getRepositoryToken } from '@nestjs/typeorm';
import { PurchaseOrderOversea } from './entities/purchase-order-oversea.entity';

describe('PurchaseOrderOverseaService', () => {
  let service: PurchaseOrderOverseaService;
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
        PurchaseOrderOverseaService,
        {
          provide: getRepositoryToken(PurchaseOrderOversea, 'Endeavour'),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn(),
            count: jest.fn(),
          },
        },
        {
          provide: getDataSourceToken('Endeavour'),
          useValue: dataSourceMock,
        },
      ],
    }).compile();

    service = module.get<PurchaseOrderOverseaService>(
      PurchaseOrderOverseaService,
    );

    (service as any).logger = loggerMock;
  });

  it('should return paginated data when data exists', async () => {
    expect(service).toBeDefined();
    const MockPoIDs = [{ PoID: 202505001 }, { PoID: 202504099 }];
    const MockData = [
      {
        Companyname: 'Pine-Pacific Corporation Limited',
        ReciveDate: '2002-07-03T17:00:00.000Z',
        PoDate: '2002-06-10T17:00:00.000Z',
        PoID: 202505001,
        ProductName: 'MockName1',
        SupplierName: 'Mocksupplier1',
        Purpose: null,
        Amount: 0,
        Dep: null,
        PurchaseBy: 'MockPurchaseBy1',
        CategoryOfPurchase: 'Non-Asset',
        ProductID: '1400708013',
        IsPurchaseOverseas: true,
      },
      {
        Companyname: 'Pine-Pacific Corporation Limited',
        ReciveDate: '2002-07-04T17:00:00.000Z',
        PoDate: '2002-06-10T17:00:00.000Z',
        PoID: 202504099,
        ProductName: 'MockName2',
        SupplierName: 'Mocksupplier2',
        Purpose: null,
        Amount: 0,
        Dep: null,
        PurchaseBy: 'MockPurchaseBy2',
        CategoryOfPurchase: 'Asset',
        ProductID: '1400709009',
        IsPurchaseOverseas: true,
      },
    ];
    dataSourceMock.query = jest
      .fn()
      .mockResolvedValueOnce(MockPoIDs)
      .mockResolvedValueOnce(MockData)

    const result = await service.purchaseOrderOverseaList(1);

    expect(result).toEqual({
      data: MockData,
      pageNo: 1,
      total: MockData.length,
    });
  });

  it('should return empty data if no purchase orders found', async () => {
    (dataSourceMock.query as jest.Mock).mockResolvedValueOnce([]);
    const result = await service.purchaseOrderOverseaList(1);
    expect(result).toEqual({ data: [], pageNo: -1, total: -1 });
    expect(loggerMock.warn).toHaveBeenCalledWith('exceed the data');
  });

  it('should throw an error if page is not a number', async () => {
    // @ts-ignore
    await expect(service.purchaseOrderOverseaList('not-a-number')).rejects.toThrow();
  });

  it('should throw an error if page is negative', async () => {
    await expect(service.purchaseOrderOverseaList(-1)).rejects.toThrow();
  });

  it('should throw an error if input parameter is empty in purchaseOrderOverseaList', async () => {
    await expect(service.purchaseOrderOverseaList('' as any)).rejects.toThrow();
  });

  it('should throw an error if query fails in purchaseOrderOverseaList', async () => {
    (dataSourceMock.query as jest.Mock).mockRejectedValueOnce(new Error('DB error'));
    await expect(service.purchaseOrderOverseaList(1)).rejects.toThrow('Error fetching purchase orders');
  });
  
  it('should return data for Asset type', async () => {
    const mockResult = [
      {
        Companyname: 'Pine-Pacific',
        ReciveDate: '2022-01-01T00:00:00.000Z',
        PoDate: '2022-01-02T00:00:00.000Z',
        PoID: 123,
        ProductName: 'AssetProduct',
        SupplierName: 'SupplierA',
        Purpose: 'PurposeA',
        Amount: 100,
        Dep: 'DepA',
        PurchaseBy: 'UserA',
        ProductType: 'Asset',
        ProductID: '50001',
        ProductNo: 1,
        IsPurchaseOverseas: true,
      },
    ];
    dataSourceMock.query = jest.fn().mockResolvedValueOnce(mockResult)
    const result = await service.purchaseOrderOverseaByType('ASSET', 1)
    expect(result).toEqual({
      data: mockResult,
      pageNo: 1,
      total: mockResult.length,
    });
  });
  
  it('should return data for Non-Asset type', async () => {
    const mockResult = [
      {
        Companyname: 'Pine-Pacific',
        ReciveDate: '2022-01-01T00:00:00.000Z',
        PoDate: '2022-01-02T00:00:00.000Z',
        PoID: 124,
        ProductName: 'NonAssetProduct',
        SupplierName: 'SupplierB',
        Purpose: 'PurposeB',
        Amount: 200,
        Dep: 'DepB',
        PurchaseBy: 'UserB',
        ProductType: 'Non-Asset',
        ProductID: '40001',
        ProductNo: 2,
        IsPurchaseOverseas: false,
      },
    ];
     dataSourceMock.query = jest.fn().mockResolvedValueOnce(mockResult)
    const result = await service.purchaseOrderOverseaByType('NON-ASSET', 1)
    expect(result).toEqual({
      data: mockResult,
      pageNo: 1,
      total: mockResult.length,
    });
  });

  it('should return empty data if no purchase orders found', async () => {
    (dataSourceMock.query as jest.Mock).mockResolvedValueOnce([]);
    const result = await service.purchaseOrderOverseaByType('ASSET', 1);
    expect(result).toEqual({ data: [], pageNo: -1, total: -1 });
    expect(loggerMock.warn).toHaveBeenCalledWith('exceed the data for type ASSET');
  });

  it('should throw an error if query fails', async () => {
    (dataSourceMock.query as jest.Mock).mockRejectedValueOnce(new Error('DB error'));
    await expect(service.purchaseOrderOverseaByType('Asset', 1)).rejects.toThrow('Error fetching purchase orders by type Asset');
  });

  it('should throw an error if input parameter is invalid', async () => {
    await expect(service.purchaseOrderOverseaByType('not-asset-type', 1)).rejects.toThrow('Error fetching purchase orders by type not-asset-type');
  });

  it('should throw an error if input parameter is empty', async () => {
    await expect(service.purchaseOrderOverseaByType('', 1)).rejects.toThrow('Error fetching purchase orders by type ');
  });

  it('should throw an error if input parameter is a number', async () => {
    await expect(service.purchaseOrderOverseaByType(123 as any, 1)).rejects.toThrow('Error fetching purchase orders by type 123');
  });

  it('should throw an error if page is a non-numeric string', async () => {
    await expect(service.purchaseOrderOverseaByType('ASSET', 'abc' as any)).rejects.toThrow();
  });

  it('should throw an error if page is null', async () => {
    await expect(service.purchaseOrderOverseaByType('ASSET', null as any)).rejects.toThrow();
  });

  it('should throw an error if page is undefined', async () => {
    await expect(service.purchaseOrderOverseaByType('ASSET', undefined as any)).rejects.toThrow();
  });

  it('should throw an error if page is a negative number', async () => {
    await expect(service.purchaseOrderOverseaByType('ASSET', -5)).rejects.toThrow();
  });

  it('should throw an error if page is NaN', async () => {
    await expect(service.purchaseOrderOverseaByType('ASSET', NaN as any)).rejects.toThrow();
  });

  it('should throw an error if page is NaN', async () => {
    await expect(service.purchaseOrderOverseaByType('ASSET', '' as any)).rejects.toThrow();
  });
});
