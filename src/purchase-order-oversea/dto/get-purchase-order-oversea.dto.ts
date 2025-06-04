export class PurchaseOrderOverseaDto {
  Companyname: string;
  ReciveDate: Date;
  PoDate: Date;
  PoID: number;
  ProductName: string;
  SupplierName: string;
  Purpose: string;
  Amount: number;
  Dep: string;
  PurchaseBy: string;
  CategoryOfPurchase: 'Asset' | 'Non-Asset';
  ProductID: number;
  IsPurchaseOverseas: boolean;
  ProductNo: number;
  Status: boolean;
}
