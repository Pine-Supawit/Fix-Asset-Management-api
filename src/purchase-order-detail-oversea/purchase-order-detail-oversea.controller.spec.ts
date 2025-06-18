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

    it('should call service.update and return success for valid input', async () => {
    const mockBody = {
      POObject: [
        { POID: 1, ProductID: 100, No: 5 },
      ],
      POType: 'TestType',
    };
    const mockBodyExpect = {
      POObject: [
        { POID: 1, ProductID: 100, No: 5 },
      ],
      POType: 'TESTTYPE',
    };
    const mockResult = { status: 200, message: 'Purchase order oversea updated successfully' };
    service.update = jest.fn().mockResolvedValue(mockResult);
    const result = await controller.update({ ...mockBody });
    expect(service.update).toHaveBeenCalledWith(mockBodyExpect);
    expect(result).toEqual(mockResult);
  });

  it('should call service.update and return success when POType is omitted', async () => {
    const mockBody = {
      POObject: [
        { POID: 1, ProductID: 100, No: 5 },
      ],
    };
    const mockResult = { status: 200, message: 'Purchase order oversea updated successfully' };
    service.update = jest.fn().mockResolvedValue(mockResult);
    const result = await controller.update({ ...mockBody });
    expect(service.update).toHaveBeenCalledWith(mockBody);
    expect(result).toEqual(mockResult);
  });

  it('should throw error if POObject is empty', async () => {
    const mockBody = {
      POObject: [],
      POType: 'TestType',
    };
    service.update = jest.fn().mockImplementation(() => { throw new Error('POObject array is empty.'); });
    await expect(controller.update({ ...mockBody })).rejects.toThrow('POObject array is empty.');
  });

  it('should throw error if POType is not a string', async () => {
    const mockBody = {
      POObject: [{ POID: 1, ProductID: 100, No: 5 }],
      POType: 12345 as any,
    };
    service.update = jest.fn().mockImplementation(() => { throw new Error('Error updating purchase order'); });
    await expect(controller.update({ ...mockBody })).rejects.toThrow('str.trim is not a function');
  });

  it('should throw error if service throws', async () => {
    const mockBody = {
      POObject: [{ POID: 1, ProductID: 100, No: 5 }],
      POType: 'TestType',
    };
    service.update = jest.fn().mockRejectedValue(new Error('Service error'));
    await expect(controller.update({ ...mockBody })).rejects.toThrow('Service error');
  });

  it('should throw error if POObject is missing required fields', async () => {
    const mockBody = {
      POObject: [{ ProductID: 100, No: 5 }], // POID missing
      POType: 'TestType',
    };
    service.update = jest.fn().mockImplementation(() => { throw new Error('Error updating purchase order'); });
    await expect(controller.update({ ...mockBody })).rejects.toThrow('Error updating purchase order');
  });

});
