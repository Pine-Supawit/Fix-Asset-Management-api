import { Test, TestingModule } from '@nestjs/testing';
import { PurchaseOrderDetailOverseaController } from './purchase-order-detail-oversea.controller';
import { PurchaseOrderDetailOverseaService } from './purchase-order-detail-oversea.service';
import { BadRequestException } from '@nestjs/common';

describe('PurchaseOrderDetailOverseaController', () => {
  let controller: PurchaseOrderDetailOverseaController;
  let service: PurchaseOrderDetailOverseaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PurchaseOrderDetailOverseaController],
      providers: [
        {
          provide: PurchaseOrderDetailOverseaService,
          useValue: {
            purchaseOrderDetailOversea: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<PurchaseOrderDetailOverseaController>(
      PurchaseOrderDetailOverseaController,
    );
    service = module.get<PurchaseOrderDetailOverseaService>(
      PurchaseOrderDetailOverseaService,
    );
  });

  it('should return expected result from service', async () => {
    const mockResult = {
      Companyname: 'Pine-Pacific Corporation Limited',
      CategoryOfAsset: 'Asset',
      PuchasingOfficer: 'OfficerMock',
      requestBy: 'requstOfficerMock',
      purchasePurpose: 'Mock testing',
      procurementMethod: true,
      productID: '100',
      productName: 'Mock Product',
      supplierName: 'Mock Supplier',
      quantity: 1,
      amount: 305000,
      invoiceNum: 'INV-123456',
      invoiceDate: '2025-10-01',
    };
    (service.purchaseOrderDetailOversea as jest.Mock).mockResolvedValue(
      mockResult,
    );

    const result = await controller.purchaseOrderDetailOversea(1, 100, 5);

    expect(service.purchaseOrderDetailOversea).toHaveBeenCalledWith(1, 100, 5);
    expect(result).toBe(mockResult);
  });

  it('should throw error if poid is missing', async () => {
    await expect(
      controller.purchaseOrderDetailOversea(null as any, 100, 5),
    ).rejects.toThrow(BadRequestException);
  });

  it('should throw error if productId is missing', async () => {
    await expect(
      controller.purchaseOrderDetailOversea(1, null as any, 5),
    ).rejects.toThrow(BadRequestException);
  });

  it('should throw error if productNo is missing', async () => {
    await expect(
      controller.purchaseOrderDetailOversea(1, 100, null as any),
    ).rejects.toThrow(BadRequestException);
  });

  it('should throw error if poid is empty', async () => {
    await expect(
      controller.purchaseOrderDetailOversea('' as any, 100, 5),
    ).rejects.toThrow(BadRequestException);
  });

  it('should throw error if productID is missing', async () => {
    await expect(
      controller.purchaseOrderDetailOversea(1, '' as any, 5),
    ).rejects.toThrow(BadRequestException);
  });

  it('should throw error if productNo is empty', async () => {
    await expect(
      controller.purchaseOrderDetailOversea(1, 100, '' as any),
    ).rejects.toThrow(BadRequestException);
  });

  it('should throw error if poid is negative number', async () => {
    await expect(
      controller.purchaseOrderDetailOversea(-1, 100, 5),
    ).rejects.toThrow(BadRequestException);
  });

  it('should throw error if productID is negative number', async () => {
    await expect(
      controller.purchaseOrderDetailOversea(1, -100, 5),
    ).rejects.toThrow(BadRequestException);
  });

  it('should throw error if productNo is negative number', async () => {
    await expect(
      controller.purchaseOrderDetailOversea(1, 100, -5),
    ).rejects.toThrow(BadRequestException);
  });

});
