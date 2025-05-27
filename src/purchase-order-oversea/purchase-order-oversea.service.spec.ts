import { Test, TestingModule } from '@nestjs/testing';
import { PurchaseOrderOverseaService } from './purchase-order-oversea.service';
import { DataSource } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
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
          provide: DataSource,
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
      .mockResolvedValueOnce(MockPoIDs) // First query for PoIDs
      .mockResolvedValueOnce(MockData); // Second query for full data

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
});
