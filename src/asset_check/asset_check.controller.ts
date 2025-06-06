import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { AssetCheckService } from './asset_check.service';
import { CreateAssetCheckDto } from './dto/create-asset_check.dto';
import { UpdateAssetCheckDto } from './dto/update-asset_check.dto';
import { FindAssetCheckDto } from './dto/find-assetcheck.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Assets Checklist')
@Controller('assets-checklist')
export class AssetCheckController {
  constructor(private readonly assetCheckService: AssetCheckService) { }

  @Get()
  @ApiOperation({ summary: 'Get all asset checks' })
  findAll(@Query() body: FindAssetCheckDto) {
    return this.assetCheckService.findAll(body);
  }

}
