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
          useValue: {},
        },
        {
          provide: getDataSourceToken('Endeavour'),
          useValue: dataSourceMock,
        },
      ],
    }).compile();

    service = module.get<PurchaseOrderOverseaService>(PurchaseOrderOverseaService);
    (service as any).logger = loggerMock;
  });

  it('should return data with correct structure for valid input', async () => {
    const mockResult = [
      {
        Company: 'Pine-Pacific Corporation Limited',
        ReceiveDate: '2022-01-01',
        PODate: '2022-01-02',
        POID: 1,
        ProductName: 'Test',
        SupplierName: 'Supplier',
        Purpose: 'Purpose',
        Amount: 100,
        Department: 'Dept',
        PurchaseBy: 'User',
        RequestBy: 'Req',
        Category: 'Asset',
        ProductID: '50001',
        ProductNo: 1,
        IsPurchaseOverseas: true,
        Status: 'Active',
        PoType: 'Type',
        Totalrecrod: 1,
      },
    ];
    (dataSourceMock.query as jest.Mock).mockResolvedValueOnce(mockResult);
    const result = await service.purchaseOrderOverseaList(1, undefined, undefined, undefined, 1, 10, '2022-01-01', '2022-01-31');
    expect(result).toEqual({
      data: mockResult,
      page: 1,
      totalInPage: 1,
      total: 1,
    });
  });

  it('should return empty data if no purchase orders found', async () => {
    (dataSourceMock.query as jest.Mock).mockResolvedValueOnce([]);
    const result = await service.purchaseOrderOverseaList(1, undefined, undefined, undefined, 1, 10, '2022-01-01', '2022-01-31');
    expect(result).toEqual({ data: [], page: -1, totalInPage: -1, total: -1 });
    expect(loggerMock.warn).toHaveBeenCalledWith('exceed the data');
  });

  it('should throw error if more than one filter is provided', async () => {
    await expect(service.purchaseOrderOverseaList(1, 'type', 'officer', undefined, 1, 10, '2022-01-01', '2022-01-31')).rejects.toThrow(
      'Error fetching purchase orders'
    );
  });

  it('should throw error if query fails', async () => {
    (dataSourceMock.query as jest.Mock).mockRejectedValueOnce(new Error('DB error'));
    await expect(service.purchaseOrderOverseaList(1, undefined, undefined, undefined, 1, 10, '2022-01-01', '2022-01-31')).rejects.toThrow('Error fetching purchase orders');
    expect(loggerMock.error).toHaveBeenCalledWith('Error fetching purchase orders', expect.any(Error));
  });

  it('should handle only poid filter', async () => {
    const mockResult = [
      {
        Company: 'Pine-Pacific Corporation Limited',
        ReceiveDate: '2022-01-01',
        PODate: '2022-01-02',
        POID: 1,
        ProductName: 'Test',
        SupplierName: 'Supplier',
        Purpose: 'Purpose',
        Amount: 100,
        Department: 'Dept',
        PurchaseBy: 'User',
        RequestBy: 'Req',
        Category: 'Asset',
        ProductID: '50001',
        ProductNo: 1,
        IsPurchaseOverseas: true,
        Status: 'Active',
        PoType: 'Type',
        Totalrecrod: 1,
      },
    ];
    (dataSourceMock.query as jest.Mock).mockResolvedValueOnce(mockResult);
    const result = await service.purchaseOrderOverseaList(1, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
    expect(result).toEqual({
      data: mockResult,
      page: undefined,
      totalInPage: 1,
      total: 1,
    });
  });

  it('should handle only type filter', async () => {
    const mockResult = [
      {
        Company: 'Pine-Pacific Corporation Limited',
        ReceiveDate: '2022-01-01',
        PODate: '2022-01-02',
        POID: 1,
        ProductName: 'Test',
        SupplierName: 'Supplier',
        Purpose: 'Purpose',
        Amount: 100,
        Department: 'Dept',
        PurchaseBy: 'User',
        RequestBy: 'Req',
        Category: 'Asset',
        ProductID: '50001',
        ProductNo: 1,
        IsPurchaseOverseas: true,
        Status: 'Active',
        PoType: 'Type',
        Totalrecrod: 1,
      },
    ];
    (dataSourceMock.query as jest.Mock).mockResolvedValueOnce(mockResult);
    const result = await service.purchaseOrderOverseaList(undefined, 'Asset', undefined, undefined, undefined, undefined, undefined, undefined);
    expect(result).toEqual({
      data: mockResult,
      page: undefined,
      totalInPage: 1,
      total: 1,
    });
  });

  it('should handle only purchaseOfficer filter', async () => {
    const mockResult = [
      {
        Company: 'Pine-Pacific Corporation Limited',
        ReceiveDate: '2022-01-01',
        PODate: '2022-01-02',
        POID: 1,
        ProductName: 'Test',
        SupplierName: 'Supplier',
        Purpose: 'Purpose',
        Amount: 100,
        Department: 'Dept',
        PurchaseBy: 'User',
        RequestBy: 'Req',
        Category: 'Asset',
        ProductID: '50001',
        ProductNo: 1,
        IsPurchaseOverseas: true,
        Status: 'Active',
        PoType: 'Type',
        Totalrecrod: 1,
      },
    ];
    (dataSourceMock.query as jest.Mock).mockResolvedValueOnce(mockResult);
    const result = await service.purchaseOrderOverseaList(undefined, undefined, 'User', undefined, undefined, undefined, undefined, undefined);
    expect(result).toEqual({
      data: mockResult,
      page: undefined,
      totalInPage: 1,
      total: 1,
    });
  });

  it('should handle only requestOfficer filter', async () => {
    const mockResult = [
      {
        Company: 'Pine-Pacific Corporation Limited',
        ReceiveDate: '2022-01-01',
        PODate: '2022-01-02',
        POID: 1,
        ProductName: 'Test',
        SupplierName: 'Supplier',
        Purpose: 'Purpose',
        Amount: 100,
        Department: 'Dept',
        PurchaseBy: 'User',
        RequestBy: 'Req',
        Category: 'Asset',
        ProductID: '50001',
        ProductNo: 1,
        IsPurchaseOverseas: true,
        Status: 'Active',
        PoType: 'Type',
        Totalrecrod: 1,
      },
    ];
    (dataSourceMock.query as jest.Mock).mockResolvedValueOnce(mockResult);
    const result = await service.purchaseOrderOverseaList(undefined, undefined, undefined, 'Req', undefined, undefined, undefined, undefined);
    expect(result).toEqual({
      data: mockResult,
      page: undefined,
      totalInPage: 1,
      total: 1,
    });
  });
});