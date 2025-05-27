import { Test, TestingModule } from '@nestjs/testing';
import { PurchaseOrderOverseaController } from './purchase-order-oversea.controller';
import { PurchaseOrderOverseaService } from './purchase-order-oversea.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { PurchaseOrderOversea } from './entities/purchase-order-oversea.entity';

describe('PurchaseOrderOverseaController', () => {
  let controller: PurchaseOrderOverseaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PurchaseOrderOverseaController],
      providers: [
        PurchaseOrderOverseaService,
        {
          provide: getRepositoryToken(PurchaseOrderOversea, 'Endeavour'),
          useValue: {} as Partial<Repository<PurchaseOrderOversea>>,
        },
        {
          provide: DataSource,
          useValue: {
            query: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<PurchaseOrderOverseaController>(PurchaseOrderOverseaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
