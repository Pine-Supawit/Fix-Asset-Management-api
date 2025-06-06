import { Injectable, Logger } from '@nestjs/common';
import { CreateAssetCheckDto } from './dto/create-asset_check.dto';
import { UpdateAssetCheckDto } from './dto/update-asset_check.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AssetChecklist } from './entities/asset_check.entity';
import { Repository } from 'typeorm';
import { FindAssetCheckDto } from './dto/find-assetcheck.dto';

@Injectable()
export class AssetCheckService {
  private readonly logger = new Logger(AssetCheckService.name);
  constructor(
    @InjectRepository(AssetChecklist, 'off_pp')
    private readonly assetCheckRepository: Repository<AssetChecklist>,
  ) { }
  async findAll(params: FindAssetCheckDto) {
    try {
      const page = params.page || 1;
      const limit = params.limit || 10;
      const skip = (page - 1) * limit;
      const [assetChecks, total] = await this.assetCheckRepository.findAndCount({
        where: {
          AssChecklist_ID: params.AssChecklist_ID,
        },
        skip: skip,
        take: limit,
        order: {
          AssChecklist_ID: 'DESC',
        },
      });
      this.logger.debug(`[find-many-assetChecks]: ${JSON.stringify(assetChecks)}\n [total]: ${total}`);
      this.logger.debug(`[find-many-assetChecks]: ${JSON.stringify(assetChecks.length)}`);
      return {
        data: assetChecks,
        pagination: {
          page: page,
          limit: limit,
          total: total,
        },
        status: 200,
      };
    } catch (error) {
      this.logger.error('Error fetching assets', error);
      throw new Error('Error fetching assets');
    }
  }

  // create(createAssetCheckDto: CreateAssetCheckDto) {
  //   return 'This action adds a new assetCheck';
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} assetCheck`;
  // }

  // update(id: number, updateAssetCheckDto: UpdateAssetCheckDto) {
  //   return `This action updates a #${id} assetCheck`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} assetCheck`;
  // }
}
