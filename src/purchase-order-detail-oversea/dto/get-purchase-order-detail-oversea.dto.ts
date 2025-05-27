export class PurchaseOrderOverseaReportDto {
  Companyname: string;

  CategoryOfAsset: 'Asset' | 'Non-Asset';

  PuchasingOfficer: string;

  requestBy: string;

  purchasePurpose: string;

  procurementMethod: boolean;

  productID: string;

  productName: string;

  supplierName: string;

  quantity: number;

  amount: number;

  invoiceNum: string;

  invoiceDate: Date;
}
