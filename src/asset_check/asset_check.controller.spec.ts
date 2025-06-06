import { Test, TestingModule } from '@nestjs/testing';
import { AssetCheckController } from './asset_check.controller';
import { AssetCheckService } from './asset_check.service';

describe('AssetCheckController', () => {
  let controller: AssetCheckController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssetCheckController],
      providers: [AssetCheckService],
    }).compile();

    controller = module.get<AssetCheckController>(AssetCheckController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
