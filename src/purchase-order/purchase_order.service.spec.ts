import { Test, TestingModule } from '@nestjs/testing';
import { PurchaseOrderService } from './purchase_order.service';
import { Repository } from 'typeorm';
import { PurchaseOrderDetail } from 'src/purchase-order-detail/entities/purchase-order-detail.entity';
import { PurchaseOrder } from './entities/purchase_order.entity';
import { PurchaseRequestService } from 'src/purchase-request/purchase_request.service';
import { SupplierService } from 'src/supplier/supplier.service';
import { getRepositoryToken } from '@nestjs/typeorm';
describe('PurchaseOrderService', () => {
  let service: PurchaseOrderService;
  let detailRepo: Repository<PurchaseOrderDetail>;
  let poRepo: Repository<PurchaseOrder>;
  let purchaseRequestService: PurchaseRequestService;
  let supplierService: SupplierService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PurchaseOrderService,
        {
          provide: getRepositoryToken(PurchaseOrderDetail),
          useValue: {
            createQueryBuilder: jest.fn(() => queryBuilderMock),
          },
        },
        {
          provide: getRepositoryToken(PurchaseOrder),
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: PurchaseRequestService,
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: SupplierService,
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PurchaseOrderService>(PurchaseOrderService);
    detailRepo = module.get(getRepositoryToken(PurchaseOrderDetail));
    poRepo = module.get(getRepositoryToken(PurchaseOrder));
    purchaseRequestService = module.get(PurchaseRequestService);
    supplierService = module.get(SupplierService);
  });

  const queryBuilderMock: any = {
    innerJoinAndSelect: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    andWhere: jest.fn().mockReturnThis(),
    skip: jest.fn().mockReturnThis(),
    take: jest.fn().mockReturnThis(),
    orderBy: jest.fn().mockReturnThis(),
    addOrderBy: jest.fn().mockReturnThis(),
    getManyAndCount: jest.fn(),
  };

  it('should return paginated purchase orders with mapping', async () => {
    const mockParams = {
      page: 1,
      limit: 2,
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      Category: 'Asset',
    };

    const mockDetail = {
      PurchaseID: 1,
      RevisionID: 1,
      AssetID: 'A',
      ProductID: 'P1',
      SProductName: 'Test Product',
      No: 1,
      Amount: 100,
      Status: 'Done',
    };

    const mockPO = {
      PurchaseID: 1,
      RevisionID: 1,
      PRNo: 'PR123',
      SupplierID: 'S1',
      Company: 'P/P',
      ShippingAgent: 'Agent',
      PurchaseOfficer: 'Officer',
      PRDivision: 'IT',
      ForDivision: 'Sales',
      ReceiveDocDate: new Date(),
      DateOrder: new Date(),
      GrandTotal: 120,
      VAT: 7,
      TotalPrice: 100,
    };

    const mockRequest = {
      Purpose: 'Maintenance',
    };

    const mockSupplier = {
      data: {
        SupplierName: 'Test Supplier',
      },
    };

    queryBuilderMock.getManyAndCount.mockResolvedValue([[mockDetail], 1]);
    jest.spyOn(poRepo, 'findOne').mockResolvedValue(mockPO as any);
    jest.spyOn(purchaseRequestService, 'findOne').mockResolvedValue(mockRequest as any);
    jest.spyOn(supplierService, 'findOne').mockResolvedValue(mockSupplier as any);

    const result = await service.findAll(mockParams);

    expect(result).toHaveProperty('data');
    expect(result.data.length).toBe(1);
    expect(result.data[0].POID).toBe('1');
    expect(result.data[0].SupplierName).toBe('Test Supplier');
    expect(result.pagination.total).toBe(1);
  });
});
