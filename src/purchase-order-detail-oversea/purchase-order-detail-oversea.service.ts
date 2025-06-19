import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreatePurchaseOrderDetailOverseaDto } from './dto/create-purchase-order-detail-oversea.dto';
import { UpdatePurchaseOrderDetailOverseaDto } from './dto/update-purchase-order-detail-oversea.dto';
import { PurchaseOrderDetailOversea } from './entities/purchase-order-detail-oversea.entity';
import { getDataSourceToken, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { adjustToLocalTime } from 'src/common/utils/adjust-local-time';

@Injectable()
export class PurchaseOrderDetailOverseaService {
  constructor(
    @InjectRepository(PurchaseOrderDetailOversea, 'Endeavour')
    private purchaseOrderOverseaRepo: Repository<PurchaseOrderDetailOversea>,
    @Inject(getDataSourceToken('Endeavour'))
    private dataSource: DataSource,
  ) {}

  private logger = new Logger();

  async purchaseOrderDetailOversea(
    poid: Number,
    productID: Number,
    productNo: Number,
  ) {
    try {
      const query = `
      select 'Pine-Pacific Corporation Limited' as Company,
        CASE 
            WHEN pod.ProductID LIKE '5%' THEN 'Asset'
            WHEN pod.ProductID LIKE '1%' THEN 'Product'
            WHEN pod.ProductID LIKE '20%' or pod.ProductID LIKE '21%' or pod.ProductID LIKE '22%' THEN 'Tools'
            WHEN pod.ProductID LIKE '23%' or pod.ProductID LIKE '24%' or pod.ProductID LIKE '25%' THEN 'Service'
            ELSE 'Undefined'
        END AS Category,
        po.PurchaseOfficer as PurchaseBy,
        pr.RequestBy as RequestBy,
        pr.Purpose as Purpose,
        po.IsPurchaseOverseas as ProcurementMethod,
        pod.ProductID as ProductID,
        pod.SProductName as ProductName,
        sup.SupplierName as SupplierName,
        CONCAT(pod.Quantity, ' ', pod.Unit) as Quantity,
        pod.Amount as Amount,
        s.InvNO as InvoiceNum,
        DATEADD(HOUR, 7, s.InvDate) as InvoiceDate,
        Case
          When IsActive = '1' then 'Active'
          Else 'Inactive'
        End as Status,
        pod.POType as POType,
        DATEADD(HOUR, 7, pod.POTypeDate) as POTypeDate
      from [Endeavour].[dbo].[PurchaseOrder] po
      left Join [Endeavour].[dbo].[PurchaseOrderDetailed] pod on po.PurchaseID = pod.PurchaseID
      left Join [Endeavour].[dbo].[PurchaseRequest] pr on po.PRNO = pr.PRNO
      left Join [Endeavour].[dbo].[ShipmentDetail] sd on sd.PurchaseID = po.PurchaseID and sd.NO = pod.No
      left Join [Endeavour].[dbo].[Shipment] s on s.ShipmentID = sd.ShipmentID
      left Join [Ent_db].[dbo].[Supplier] sup on sup.SupplierID = po.SupplierID
      WHERE po.PurchaseID = ${poid} and pod.No = ${productNo} and pod.ProductID = ${productID}
` 
      const result = await this.dataSource.query(query);

      if (result.length === 0) {
        this.logger.warn('No purchase order details found for the given criteria');
        return {data: [], page: -1, total: -1};
      }
      this.logger.log('Purchase order details fetched successfully');
      this.logger.log({data: result})
      return result
    } catch (error) {
      this.logger.error('Error fetching purchase orders details', error);
      throw new Error('Error fetching purchase orders details');
    }
  }

  async update(params: UpdatePurchaseOrderDetailOverseaDto) {
    try {
      const { POObject, POType } = params;

      if (!POObject.length) {
        throw new Error('POObject array is empty.');
      }
      const updatePromises = POObject.map(({ POID, ProductID, No }) => {
      const query = `
        UPDATE [Endeavour].[dbo].[PurchaseOrderDetailed]
        SET 
          POType = '${POType}',
          POTypeDate = DATEADD(HOUR, 7, GETDATE())
        WHERE 
          PurchaseID = ${POID} AND 
          ProductID = ${ProductID} AND 
          No = ${No}`;
      //this.logger.debug(`[update-purchase-order]: ${query}`);
      return this.dataSource.query(query);
    })

      await Promise.all(updatePromises);
      return { status: 200, message: 'Purchase order oversea updated successfully' };
    } catch (error) {
      this.logger.error(error);
      throw new Error('Error updating purchase order');
    }
  }
}
