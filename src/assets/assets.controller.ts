import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { AssetsService } from './assets.service';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { FindAssetDto } from './dto/find-asset.dto';

@Controller('assets')
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) { }

  @Get()
  findAll(@Query() body: FindAssetDto) {
    return this.assetsService.findAll(body);
  }

  // @Post()
  // create(@Body() createAssetDto: CreateAssetDto) {
  //   return this.assetsService.create(createAssetDto);
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.assetsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAssetDto: UpdateAssetDto) {
  //   return this.assetsService.update(+id, updateAssetDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.assetsService.remove(+id);
  // }
}
