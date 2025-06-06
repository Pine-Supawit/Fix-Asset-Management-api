import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: 'PurchaseOrder', schema: 'dbo' }) 
export class SupplierOversea {
  @PrimaryColumn({ length: 10 })
  SupplierID: string;

  @Column({ length: 200 })
  SupplierName: string;

  @Column({ length: 500 })
  Address: string;

  @Column({ length: 200 })
  Tel: string;

  @Column({ length: 200 })
  Fax: string;

  @Column({ length: 500 })
  ProductLine: string;

  @Column({ length: 300 })
  Contact1: string;

  @Column({ length: 300 })
  Contact2: string;

  @Column({ length: 300 })
  Contact3: string;

  @Column({ length: 300 })
  Contact4: string;

  @Column({ length: 300 })
  Contact5: string;

  @Column({ length: 90 })
  BankName: string;

  @Column({ length: 500 })
  BankAddress: string;

  @Column({ length: 100 })
  Beneficiary: string;

  @Column({ length: 50 })
  AccountNo: string;

  @Column({ length: 20 })
  PineAccountNo: string;

  @Column({ length: 50 })
  PaymentTerm: string;

  @Column({ length: 150 })
  Contact1Tel: string;

  @Column({ length: 150 })
  Contact2Tel: string;

  @Column({ length: 150 })
  Contact3Tel: string;

  @Column({ length: 150 })
  Contact4Tel: string;

  @Column({ length: 150 })
  Contact5Tel: string;

  @Column({ length: 11 })
  AccCode: string;

  @Column({ length: 15 })
  AcctNum: string;

  @Column({ length: 10 })
  Shortname: string;

  @Column({ type: 'smalldatetime', nullable: true })
  ContactDate: Date;

  @Column({ length: 1000 })
  BackgroundContact: string;

  @Column({ type: 'tinyint' })
  PurchaseType: number;

  @Column({ length: 3 })
  PaymentBy: string;

  @Column({ length: 30 })
  PaymentReference: string;

  @Column({ length: 30 })
  PurchaseOfficer: string;

  @Column({ length: 15 })
  ForCompany: string;

  @Column({ type: 'tinyint' })
  Status: number;

  @Column({ type: 'tinyint' })
  CreditTerm: number;

  @Column()
  TypeContainerID: number;

  @Column({ type: 'float' })
  ContainerSize: number;

  @Column({ length: 6 })
  UnitContainer: string;

  @Column({ type: 'float' })
  Minimum: number;

  @Column({ length: 80 })
  MapFile: string;

  @Column({ length: 150 })
  Contact1Email: string;

  @Column({ length: 150 })
  Contact2Email: string;

  @Column({ length: 150 })
  Contact3Email: string;

  @Column({ length: 150 })
  Contact4Email: string;

  @Column({ length: 150 })
  Contact5Email: string;

  @Column({ length: 10 })
  BussinessType: string;

  @Column({ length: 150 })
  Bussiness: string;

  @Column({ length: 500 })
  SecondaryProduct: string;

  @Column({ length: 500 })
  Merit: string;

  @Column({ length: 20 })
  SwiftCode: string;

  @Column({ length: 2 })
  Country: string;
}

