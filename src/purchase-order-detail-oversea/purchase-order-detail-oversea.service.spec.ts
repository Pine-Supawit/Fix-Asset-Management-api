import { Test, TestingModule } from '@nestjs/testing';
import { PurchaseOrderDetailOverseaService } from './purchase-order-detail-oversea.service';
import { DataSource } from 'typeorm';
import { getDataSourceToken, getRepositoryToken } from '@nestjs/typeorm';
import { PurchaseOrderDetailOversea } from './entities/purchase-order-detail-oversea.entity';
import { UpdatePurchaseOrderDetailOverseaDto } from './dto/update-purchase-order-detail-oversea.dto';

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
        Status: 'Active',
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
    expect(result).toEqual({ data: [], page: -1, total: -1 });
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

  it('should update successfully with valid input', async () => {
    const dto: UpdatePurchaseOrderDetailOverseaDto = {
      POType: 'ASSET',
      POObject: [
        { POID: 1, ProductID: 101, No: 1 },
        { POID: 2, ProductID: 202, No: 2 },
      ],
    };

    (dataSourceMock.query as jest.Mock).mockResolvedValueOnce(null).mockResolvedValueOnce(null);

    const result = await service.update(dto);

    expect(dataSourceMock.query).toHaveBeenCalledTimes(2);
    expect(result).toEqual({
      status: 200,
      message: 'Purchase order oversea updated successfully',
    });
  });

  it('should throw error if POObject is empty', async () => {
    const dto: UpdatePurchaseOrderDetailOverseaDto = {
      POType: 'ASSET',
      POObject: [],
    };

    await expect(service.update(dto)).rejects.toThrow('Error updateing purchase orders POtype');
    expect(dataSourceMock.query).not.toHaveBeenCalled();
  });

  it('should throw general error when query fails', async () => {
    const dto: UpdatePurchaseOrderDetailOverseaDto = {
      POType: 'ASSET',
      POObject: [{ POID: 1, ProductID: 101, No: 1 }],
    };

    (dataSourceMock.query as jest.Mock).mockRejectedValue(new Error('SQL error'));

    await expect(service.update(dto)).rejects.toThrow('Error updateing purchase orders POtype');
    expect(loggerMock.error).toHaveBeenCalled();
  });


  it('should update even with string numbers in POObject', async () => {
    const dto: UpdatePurchaseOrderDetailOverseaDto = {
      POType: 'TOOL',
      POObject: [
        { POID: '10', ProductID: '200', No: '2' } as any,
      ],
    };

    (dataSourceMock.query as jest.Mock).mockResolvedValue(null);

    const result = await service.update(dto);

    expect(result).toEqual({
      status: 200,
      message: 'Purchase order oversea updated successfully',
    });
  });

   it('should update POType and Note when both are provided', async () => {
    const params = {
      POID: 1,
      ProductID: 101,
      No: 1,
      POType: 'ASSET',
      PriceNote: 'Special price',
    };
    (dataSourceMock.query as jest.Mock).mockResolvedValueOnce(null);
    const result = await service.updateByOne(params);
    expect(dataSourceMock.query).toHaveBeenCalled();
    expect(result).toEqual({
      status: 200,
      message: 'Purchase order detail oversea updated successfully',
    });
  });

  it('should update only POType when PriceNote is not provided', async () => {
    const params = {
      POID: 1,
      ProductID: 101,
      No: 1,
      POType: 'ASSET',
    };
    (dataSourceMock.query as jest.Mock).mockResolvedValueOnce(null);
    const result = await service.updateByOne(params);
    expect(dataSourceMock.query).toHaveBeenCalled();
    expect(result).toEqual({
      status: 200,
      message: 'Purchase order detail oversea updated successfully',
    });
  });

  it('should update only Note when POType is not provided', async () => {
    const params = {
      POID: 1,
      ProductID: 101,
      No: 1,
      PriceNote: 'Special price',
    };
    (dataSourceMock.query as jest.Mock).mockResolvedValueOnce(null);
    const result = await service.updateByOne(params);
    expect(dataSourceMock.query).toHaveBeenCalled();
    expect(result).toEqual({
      status: 200,
      message: 'Purchase order detail oversea updated successfully',
    });
  });

  it('should throw error if query fails', async () => {
    const params = {
      POID: 1,
      ProductID: 101,
      No: 1,
      POType: 'ASSET',
      PriceNote: 'Special price',
    };
    (dataSourceMock.query as jest.Mock).mockRejectedValueOnce(new Error('SQL error'));
    await expect(service.updateByOne(params)).rejects.toThrow('Error updateing purchase orders details');
    expect(loggerMock.error).toHaveBeenCalled();
  });

  it('should handle string numbers for POID, ProductID, No', async () => {
    const params = {
      POID: '1',
      ProductID: '101',
      No: '1',
      POType: 'ASSET',
      PriceNote: 'Special price',
    } as any;
    (dataSourceMock.query as jest.Mock).mockResolvedValueOnce(null);
    const result = await service.updateByOne(params);
    expect(result).toEqual({
      status: 200,
      message: 'Purchase order detail oversea updated successfully',
    });
  });

  it('should throw error if required fields are missing', async () => {
    const params = {
      POType: 'ASSET',
      PriceNote: 'Special price',
    } as any;

    (dataSourceMock.query as jest.Mock).mockRejectedValue(new Error('SQL error'));
    await expect(service.updateByOne(params)).rejects.toThrow('Error updateing purchase orders details');
    expect(loggerMock.error).toHaveBeenCalled();
  });

});
