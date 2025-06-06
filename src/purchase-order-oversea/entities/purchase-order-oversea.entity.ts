import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'PurchaseOrder', schema: 'dbo' })
export class PurchaseOrderOversea {
  @PrimaryGeneratedColumn()
  PurchaseID: number;

  @Column({ length: 10 })
  SupplierID: string;

  @Column({ type: 'smalldatetime' })
  DateOrder: Date;

  @Column({ length: 100 })
  ATTN: string;

  @Column({ length: 50 })
  TargetShipment: string;

  @Column({ length: 3 })
  PaymentBy: string;

  @Column({ length: 5 })
  PaymentBank: string;

  @Column()
  PaymentTerm: number;

  @Column()
  CreditTerm: number;

  @Column()
  PaymentConditionID: number;

  @Column({ length: 150 })
  PaymentReference: string;

  @Column({ type: 'text' })
  Note: string;

  @Column('float')
  TotalPrice: number;

  @Column('real')
  VATRate: number;

  @Column('float')
  VAT: number;

  @Column('float')
  GrandTotal: number;

  @Column({ length: 30 })
  PurchaseOfficer: string;

  @Column({ type: 'bit' })
  PrintNote: boolean;

  @Column({ type: 'smallint' })
  Account: number;

  @Column({ length: 10 })
  Currency: string;

  @Column()
  Flag: number;

  @Column()
  PAID: number;

  @Column({ length: 100 })
  Tel: string;

  @Column({ length: 100 })
  Fax: string;

  @Column({ type: 'bit' })
  IsPurchaseOverseas: boolean;

  @Column({ type: 'smalldatetime', nullable: true })
  Sendate: Date;

  @Column({ type: 'smalldatetime', nullable: true })
  AckDate: Date;

  @Column('real')
  Freight: number;

  @Column({ type: 'bit' })
  TermCodition1: boolean;

  @Column({ type: 'bit' })
  TermCodition2: boolean;

  @Column({ type: 'bit' })
  TermCodition3: boolean;

  @Column({ type: 'bit' })
  TermCodition4: boolean;

  @Column({ type: 'bit' })
  TermCodition5: boolean;

  @Column({ length: 12 })
  PRNO: string;

  @Column({ type: 'smalldatetime', nullable: true })
  PRDate: Date;

  @Column({ type: 'text' })
  InternalNote: string;

  @Column({ length: 3 })
  CP: string;

  @Column({ length: 512 })
  CompareLink: string;

  @Column({ type: 'bit' })
  CancelPO: boolean;

  @Column()
  ApprovedStaus: number;

  @Column({ length: 30 })
  ApproveBy_PO: string;

  @Column({ type: 'smalldatetime', nullable: true })
  ApproveDate_PO: Date;

  @Column({ type: 'text' })
  ApproveNote_PO: string;

  @Column()
  UID: number;

  @Column({type: 'bit'})
  IsActive: boolean

  @Column({type: 'bit'})
  checkPoType: boolean
}
