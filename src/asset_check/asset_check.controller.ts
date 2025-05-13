import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { AssetCheckService } from './asset_check.service';
import { CreateAssetCheckDto } from './dto/create-asset_check.dto';
import { UpdateAssetCheckDto } from './dto/update-asset_check.dto';
import { FindAssetCheckDto } from './dto/find-assetcheck.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Assets Checklist')
@Controller('assets-checklist')
export class AssetCheckController {
  constructor(private readonly assetCheckService: AssetCheckService) { }

  // @Post()
  // create(@Body() createAssetCheckDto: CreateAssetCheckDto) {
  //   return this.assetCheckService.create(createAssetCheckDto);
  // }

  @Get()
  findAll(@Query() body: FindAssetCheckDto) {
    return this.assetCheckService.findAll(body);
  }

  //   @Get(':id')
  //   findOne(@Param('id') id: string) {
  //     return this.assetCheckService.findOne(+id);
  //   }

  //   @Patch(':id')
  //   update(@Param('id') id: string, @Body() updateAssetCheckDto: UpdateAssetCheckDto) {
  //     return this.assetCheckService.update(+id, updateAssetCheckDto);
  //   }

  //   @Delete(':id')
  //   remove(@Param('id') id: string) {
  //     return this.assetCheckService.remove(+id);
  //   }
}
