import { Test, TestingModule } from '@nestjs/testing';
import { SupplierOverseaController } from './supplier-oversea.controller';
import { SupplierOverseaService } from './supplier-oversea.service';

describe('SupplierOverseaController', () => {
  let controller: SupplierOverseaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SupplierOverseaController],
      providers: [SupplierOverseaService],
    }).compile();

    controller = module.get<SupplierOverseaController>(SupplierOverseaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
