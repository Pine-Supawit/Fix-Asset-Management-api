import { Test, TestingModule } from '@nestjs/testing';
import { AssetCheckService } from './asset_check.service';

describe('AssetCheckService', () => {
  let service: AssetCheckService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssetCheckService],
    }).compile();

    service = module.get<AssetCheckService>(AssetCheckService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
