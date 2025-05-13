import { Module } from '@nestjs/common';
import { AssetCheckService } from './asset_check.service';
import { AssetCheckController } from './asset_check.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssetChecklist } from './entities/asset_check.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AssetChecklist], 'off_pp')],
  controllers: [AssetCheckController],
  providers: [AssetCheckService],
})
export class AssetCheckModule { }
