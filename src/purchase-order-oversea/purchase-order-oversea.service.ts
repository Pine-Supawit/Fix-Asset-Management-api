import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreatePurchaseOrderOverseaDto } from './dto/create-purchase-order-oversea.dto';
import { UpdatePurchaseOrderOverseaDto } from './dto/update-purchase-order-oversea.dto';
import { PurchaseOrderOverseaDto } from './dto/get-purchase-order-oversea.dto';
import { PurchaseOrderOversea } from './entities/purchase-order-oversea.entity';
import { getDataSourceToken, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

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
    page: number,
  ): Promise<{
    data: PurchaseOrderOverseaDto[];
    pageNo: number;
    total: number;
  }> {
    console.time('purchaseOrderOverseaList');
    try {
      const poListSize = 10;
      const offset = (page - 1) * poListSize;

      const poListquery = `
    SELECT DISTINCT po.PurchaseID AS PoID
    FROM [Endeavour].[dbo].[PurchaseOrder] po
    ORDER BY po.PurchaseID DESC
    OFFSET ${offset} ROWS
    FETCH NEXT ${poListSize} ROWS ONLY
  `;
      const polistResult = await this.dataSource.query(poListquery);
      const poList = polistResult.map((row) => row.PoID);

      if (poList.length === 0) {
        this.logger.warn('exceed the data');
        return { data: [], pageNo: -1, total: -1 };
      }

      const query = `
      select 'Pine-Pacific Corporation Limited' as Companyname, s.DateArrive as ReciveDate, po.DateOrder as PoDate, po.PurchaseID as PoID,
      pod.SProductName as ProductName, sup.SupplierName as SupplierName, pr.Purpose as Purpose,
      pod.Amount as Amount, pr.Division as Dep, po.PurchaseOfficer as PurchaseBy,
      CASE 
         WHEN pod.ProductID LIKE '5%' THEN 'Asset'
         ELSE 'Non-Asset'
      END AS CategoryOfPurchase,
      pod.ProductID as ProductID, po.IsPurchaseOverseas as IsPurchaseOverseas
      from [Endeavour].[dbo].[PurchaseOrder] po
      left Join [Endeavour].[dbo].[PurchaseOrderDetailed] pod on po.PurchaseID = pod.PurchaseID
      left Join [Endeavour].[dbo].[PurchaseRequest] pr on po.PRNO = pr.PRNO
      left Join [Endeavour].[dbo].[ShipmentDetail] sd on sd.PurchaseID = po.PurchaseID and sd.NO = pod.No
      left Join [Endeavour].[dbo].[Shipment] S on s.ShipmentID = sd.ShipmentID
      left Join [Ent_db].[dbo].[Supplier] sup on sup.SupplierID = po.SupplierID
      WHERE po.PurchaseID IN (${poList.join(',')})
      order by po.PurchaseID desc`;
      const result = await this.dataSource.query(query);
      console.timeEnd('purchaseOrderOverseaList');
      this.logger.log({
        data: result,
        pageNo: page,
        total: result.length,
        list: poList,
      });

      return {
        data: result as PurchaseOrderOverseaDto[],
        pageNo: page,
        total: result.length,
      };
    } catch (error) {
      this.logger.error('Error fetching purchase orders', error);
      throw new Error('Error fetching purchase orders');
    }
  }

async purchaseOrderOverseaByType(poType: string, page: number) {
  try {
    const poListSize = 10;
    const offset = (page - 1) * poListSize;

    let typeQuery = '';
    if (poType === 'ASSET') {
      typeQuery = `pod.ProductID LIKE '5%'`;
    } else if (poType === 'NON-ASSET') {
      typeQuery = `pod.ProductID NOT LIKE '5%'`;
    } else {
      throw new Error(`Error find by type the ${poType} is invalid`);
    }

    const query = `
      SELECT 'Pine-Pacific' AS Companyname,
             s.DateArrive AS ReciveDate,
             po.DateOrder AS PoDate,
             po.PurchaseID AS PoID,
             pod.SProductName AS ProductName,
             sup.SupplierName AS SupplierName,
             pr.Purpose AS Purpose,
             pod.Amount AS Amount,
             pr.Division AS Dep,
             po.PurchaseOfficer AS PurchaseBy,
             CASE
               WHEN pod.ProductID LIKE '5%' THEN 'Asset'
               ELSE 'Non-Asset'
             END AS ProductType,
             pod.ProductID AS ProductID,
             pod.No AS ProductNo,
             po.IsPurchaseOverseas AS IsPurchaseOverseas
      FROM [Endeavour].[dbo].[PurchaseOrder] po
      LEFT JOIN [Endeavour].[dbo].[PurchaseOrderDetailed] pod ON po.PurchaseID = pod.PurchaseID
      LEFT JOIN [Endeavour].[dbo].[PurchaseRequest] pr ON po.PRNO = pr.PRNO
      LEFT JOIN [Endeavour].[dbo].[ShipmentDetail] sd ON sd.PurchaseID = po.PurchaseID AND sd.NO = pod.No
      LEFT JOIN [Endeavour].[dbo].[Shipment] s ON s.ShipmentID = sd.ShipmentID
      LEFT JOIN [Ent_db].[dbo].[Supplier] sup ON sup.SupplierID = po.SupplierID
      WHERE ${typeQuery}
      ORDER BY po.PurchaseID DESC
      OFFSET ${offset} ROWS
      FETCH NEXT ${poListSize} ROWS ONLY
    `;

    const result = await this.dataSource.query(query);

    if (result.length === 0) {
      this.logger.warn(`exceed the data for type ${poType}`);
      return { data: [], pageNo: -1, total: -1 };
    }

    return {
      data: result,
      pageNo: page,
      total: result.length,
    };
  } catch (error) {
    this.logger.error(
      `Error finding purchase orders by type with ${poType}`,
      error,
    );
    throw new Error(`Error find by type the ${poType} is invalid`);
  }
}
}
