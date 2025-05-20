import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { AssetsService } from './assets.service';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { FindAssetDto } from './dto/find-asset.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Assets')
@Controller('assets')
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) { }

  @Get()
  @ApiOperation({ summary: 'Get all assets' })
  findAll(@Query() body: FindAssetDto) {
    return this.assetsService.findAll(body);
  }

}
