import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
  Query,
} from '@nestjs/common';
import { CreatePurchaseOrderOverseaDto } from './dto/create-purchase-order-oversea.dto';
import { UpdatePurchaseOrderOverseaDto } from './dto/update-purchase-order-oversea.dto';
import { PurchaseOrderOverseaDto } from './dto/get-purchase-order-oversea.dto';
import { PurchaseOrderOversea } from './entities/purchase-order-oversea.entity';
import { getDataSourceToken, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import e from 'express';
import { start } from 'repl';

@Injectable()
export class PurchaseOrderOverseaService {
  constructor(
    @InjectRepository(PurchaseOrderOversea, 'Endeavour')
    private purchaseOrderOverseaRepo: Repository<PurchaseOrderOversea>,
    @Inject(getDataSourceToken('Endeavour'))
    private dataSource: DataSource,
  ) {}

  private logger = new Logger();

  async purchaseOrderOverseaList(
    poid?: number,
    type?: string,
    potype?: string,
    purchaseOfficer?: string,
    requestOfficer?: string,
    page?: number,
    limit?: number,
    startDate?: string,
    endDate?: string,
  ) {
    console.time('purchase-order-oversea-list');
    try {
      const filtersProvided = [
        poid ? 1 : 0,
        type ? 1 : 0,
        purchaseOfficer ? 1 : 0,
        requestOfficer ? 1 : 0,
      ].reduce((a, b) => a + b, 0);
      if (filtersProvided > 1) {
        throw new Error(
          'Only one of poid, purchaseOfficer, or requestOfficer can be provided at a time.',
        );
      }
      let dateFilter = '';
      let paginator = '';
      let filters = '';
      let countRecord = '*';
      let nullFilter = 'AND pod.POType is null';
      if (page && limit) {
        const resultLimit = limit;
        const offset = (page - 1) * resultLimit;
        paginator = `OFFSET ${offset} ROWS FETCH NEXT ${resultLimit} ROWS ONLY`;
      }
      if (startDate && endDate) {
        dateFilter = `WHERE po.DateOrder BETWEEN DATEADD(HOUR, 7, '${startDate}') AND DATEADD(HOUR, 7, '${endDate}')`;
      }
      if (poid) {
        filters = `WHERE PoCTE.POID = ${poid}`;
        countRecord = 'PoCTE.POID';
      }
      if (type) {
        filters = `WHERE PoCTE.Category = '${type}'`;
      }
      if (potype) {
        filters = `WHERE PoCTE.PoType = '${potype}'`;
        countRecord = 'PoCTE.PoType';
        nullFilter = '';
      }
      if (purchaseOfficer) {
        filters = `WHERE PoCTE.PurchaseBy like '%${purchaseOfficer}%'`;
        countRecord = 'PoCTE.PurchaseBy';
      }
      if (requestOfficer) {
        filters = `WHERE PoCTE.RequestBy like '%${requestOfficer}%'`;
        countRecord = 'PoCTE.RequestBy';
      }
      let query = `
      with PoCTE as(
	        select DISTINCT 'Pine-Pacific Corporation Limited' as Company, s.DateArrive as ReceiveDate, po.DateOrder as PODate, po.PurchaseID as POID,
            pod.SProductName as ProductName, sup.SupplierName as SupplierName, pr.Purpose as Purpose,
            pod.Amount as Amount, pr.Division as Department, po.PurchaseOfficer as PurchaseBy, pr.RequestBy as RequestBy,
            CASE 
              WHEN pod.ProductID LIKE '5%' THEN 'Asset'
              WHEN pod.ProductID LIKE '1%' THEN 'Product'
              WHEN pod.ProductID LIKE '20%' or pod.ProductID LIKE '21%' or pod.ProductID LIKE '22%' THEN 'Tools'
              WHEN pod.ProductID LIKE '23%' or pod.ProductID LIKE '24%' or pod.ProductID LIKE '25%' THEN 'Service'
              ELSE 'Undefined'
            END AS Category,
            pod.ProductID as ProductID, pod.No as ProductNo, po.IsPurchaseOverseas as IsPurchaseOverseas,
            Case
                When IsActive = '1' then 'Active'
                Else 'Inactive'
            End as Status,
            pod.POType as POType,
            po.PRNO as PRNO
            from [Endeavour].[dbo].[PurchaseOrder] po
            left Join [Endeavour].[dbo].[PurchaseOrderDetailed] pod on po.PurchaseID = pod.PurchaseID
            left Join [Endeavour].[dbo].[PurchaseRequest] pr on po.PRNO = pr.PRNO
            left Join [Endeavour].[dbo].[ShipmentDetail] sd on sd.PurchaseID = po.PurchaseID and sd.NO = pod.No
            left Join [Endeavour].[dbo].[Shipment] S on s.ShipmentID = sd.ShipmentID
            left Join [Ent_db].[dbo].[Supplier] sup on sup.SupplierID = po.SupplierID
            ${dateFilter}
            ${nullFilter}
        )

        select *, (SELECT COUNT(${countRecord}) FROM PoCTE ${filters}) AS Totalrecord
        from PoCTE
        ${filters}
        order by PoCTE.POID desc, PoCTE.ProductNo ASC
        ${paginator}
      `;

      // this.logger.debug(`[update-purchase-order]: ${JSON.stringify(query)}`)

      const result = await this.dataSource.query(query);
      if (result.length === 0) {
        this.logger.warn('No more data found');
        return { data: [], page: -1, totalInPage: -1, total: -1 };
      }
      this.logger.log({
        data: result,
        page: page,
        total: result.length,
        totalrecord: result[0]['Totalrecord'] || 0,
        query: query,
      });
      console.timeEnd('purchase-order-oversea-list');
      return {
        data: result,
        page: page,
        totalInPage: result.length,
        total: result[0]['Totalrecord'] || 0,
      };
    } catch (error) {
      this.logger.error('Error fetching purchase orders', error);
      throw new Error('Error fetching purchase orders');
    }
  }
}
