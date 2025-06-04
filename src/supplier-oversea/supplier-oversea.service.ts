import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreateSupplierOverseaDto } from './dto/create-supplier-oversea.dto';
import { UpdateSupplierOverseaDto } from './dto/update-supplier-oversea.dto';
import { getDataSourceToken, InjectRepository } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class SupplierOverseaService {
  constructor(
    @Inject(getDataSourceToken('Endeavour'))
    private dataSource: DataSource,
  ) {}

  private logger = new Logger();

  async supplierOverseaList(supplierName?: string) {
    try {
      let filterQuery = '';
      if (supplierName) {
        filterQuery = `WHERE SupplierName LIKE '%${supplierName}%'`;
      }
      let query = `
      SELECT SupplierID,SupplierName
      FROM [Ent_db].[dbo].[Supplier]
      ${filterQuery}
      `
      const result = await this.dataSource.query(query);
      this.logger.log({data: result,
        message: 'Supplier list fetched successfully'});
      return {
        "data": result
      }
    } catch (error) {
      this.logger.error('Error fetching supplier name', error);
      throw new Error('Error fetching supplier name');
    }
  }
}
