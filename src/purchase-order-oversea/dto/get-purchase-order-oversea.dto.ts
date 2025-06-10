export class PurchaseOrderOverseaDto {
  Company: string;
  ReciveDate: Date;
  PoDate: Date;
  POID: number;
  ProductName: string;
  SupplierName: string;
  Purpose: string;
  Amount: number;
  Department: string;
  PurchaseBy: string;
  RequestBy: string;
  Category: 'Asset' | 'Non-Asset';
  ProductID: number;
  IsPurchaseOverseas: boolean;
  ProductNo: number;
  Status: boolean;
  PoType: string;
  Totalrecrod: number;
}
