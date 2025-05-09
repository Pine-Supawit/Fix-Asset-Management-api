import { Injectable, Logger } from '@nestjs/common';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { FindAssetDto } from './dto/find-asset.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Asset } from './entities/asset.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AssetsService {
  private readonly logger = new Logger(AssetsService.name)
  constructor(
    @InjectRepository(Asset)
    private readonly assetsRepository: Repository<Asset>,
  ) { }
  create(createAssetDto: CreateAssetDto) {
    return 'This action adds a new asset';
  }

  async findAll(params: FindAssetDto) {
    try {
      const page = params.page || 1;
      const limit = params.limit || 10;
      const skip = (page - 1) * limit;
      const [assets, total] = await this.assetsRepository.findAndCount({
        skip: skip,
        take: limit,
        order: {
          Asset_ID: 'DESC',
        },
      });
      this.logger.debug(`[find-many-assets]: ${JSON.stringify(assets)}\n [total]: ${total}`);
      return {
        data: assets,
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

  findOne(id: number) {
    return `This action returns a #${id} asset`;
  }

  update(id: number, updateAssetDto: UpdateAssetDto) {
    return `This action updates a #${id} asset`;
  }

  remove(id: number) {
    return `This action removes a #${id} asset`;
  }
}
