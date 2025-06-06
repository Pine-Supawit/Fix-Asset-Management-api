import { Test, TestingModule } from '@nestjs/testing';
import { SupplierOverseaService } from './supplier-oversea.service';
import { getDataSourceToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

describe('SupplierOverseaService', () => {
  let service: SupplierOverseaService;


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
        SupplierOverseaService,
        {
          provide: getDataSourceToken('Endeavour'),
          useValue: dataSourceMock,
        },
      ],
    }).compile();
    service = module.get<SupplierOverseaService>(SupplierOverseaService);
    (service as any).logger = loggerMock;
  });


  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all suppliers when no name is provided', async () => {
    const mockResult = [
      { SupplierID: 1, SupplierName: 'Supplier A' },
      { SupplierID: 2, SupplierName: 'Supplier B' },
    ];
    (dataSourceMock.query as jest.Mock).mockResolvedValueOnce(mockResult);
    const result = await service.supplierOverseaList();
    expect(dataSourceMock.query).toHaveBeenCalledWith(expect.stringContaining('FROM [Ent_db].[dbo].[Supplier]'));
    expect(result).toEqual({ data: mockResult });
    expect(loggerMock.log).toHaveBeenCalledWith({ data: mockResult, message: 'Supplier list fetched successfully' });
  });

  it('should filter suppliers by name', async () => {
    const mockResult = [
      { SupplierID: 3, SupplierName: 'Pine-Pacific' },
    ];
    (dataSourceMock.query as jest.Mock).mockResolvedValueOnce(mockResult);
    const result = await service.supplierOverseaList('Pine');
    expect(dataSourceMock.query).toHaveBeenCalledWith(expect.stringContaining("WHERE SupplierName LIKE '%Pine%'") );
    expect(result).toEqual({ data: mockResult });
    expect(loggerMock.log).toHaveBeenCalledWith({ data: mockResult, message: 'Supplier list fetched successfully' });
  });

  it('should return empty array if no suppliers found', async () => {
    (dataSourceMock.query as jest.Mock).mockResolvedValueOnce([]);
    const result = await service.supplierOverseaList('NotExist');
    expect(result).toEqual({ data: [] });
    expect(loggerMock.log).toHaveBeenCalledWith({ data: [], message: 'Supplier list fetched successfully' });
  });

  it('should propagate errors and log them', async () => {
    (dataSourceMock.query as jest.Mock).mockRejectedValueOnce(new Error('DB error'));
    await expect(service.supplierOverseaList('Pine')).rejects.toThrow('Error fetching supplier name');
    expect(loggerMock.error).toHaveBeenCalledWith('Error fetching supplier name', expect.any(Error));
  });
});
