import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
} from 'typeorm';

@Entity('Invoice')
export class Invoice {
    @PrimaryGeneratedColumn()
    InvoiceID: number;

    @Column()
    Source: number;

    @Column({ type: 'varchar', length: 11, nullable: true })
    InvoiceNo: string;

    @Column({ type: 'smalldatetime', nullable: true })
    InvoiceDate: Date;

    @Column({ type: 'varchar', length: 10, nullable: true })
    CustomerID: string;

    @Column({ type: 'varchar', length: 25, nullable: true })
    OrderNo: string;

    @Column({ type: 'smalldatetime', nullable: true })
    DueDate: Date;

    @Column({ type: 'float', nullable: true })
    Total: number;

    @Column({ type: 'float', nullable: true })
    Vat: number;

    @Column({ type: 'real', nullable: true })
    VatRate: number;

    @Column({ type: 'varchar', length: 10, nullable: true })
    CreditTerm: string;

    @Column({ type: 'float', nullable: true })
    TotalAmount: number;

    @Column({ type: 'bit', default: false })
    UpdateStock: boolean;

    @Column({ type: 'int', nullable: true })
    DisplayEngThai: number;

    @Column({ type: 'varchar', length: 500, nullable: true })
    Note: string;

    @Column({ type: 'bit', default: false })
    PrintNote: boolean;

    @Column({ type: 'smallint', default: 1 })
    Account: number;

    @Column({ type: 'int', nullable: true })
    ARPayment: number;

    @Column({ type: 'int', nullable: true })
    ReceiptID: number;

    @Column({ type: 'smalldatetime', nullable: true })
    ReceiptDate: Date;

    @Column({ type: 'int', default: 0 })
    BillingID: number;

    @Column({ type: 'smalldatetime', nullable: true })
    BillingDate: Date;

    @Column({ type: 'smalldatetime', nullable: true })
    PayDay: Date;

    @Column({ type: 'smalldatetime', nullable: true })
    CustomerConfirmPayday: Date;

    @Column({ type: 'varchar', length: 15, nullable: true })
    RCNo: string;

    @Column({ type: 'datetime', nullable: true })
    PaidDate: Date;

    @Column({ type: 'varchar', length: 30, nullable: true })
    SaleMan: string;

    @Column({ type: 'varchar', length: 30, nullable: true })
    Editor: string;

    @Column({ type: 'smalldatetime', nullable: true })
    EditDate: Date;

    @Column({ type: 'text', nullable: true })
    NoteTAG: string;

    @Column({ type: 'text', nullable: true })
    NoteCertificate: string;

    @Column({ type: 'char', length: 2, nullable: true })
    chk: string;

    @Column({ type: 'smalldatetime', nullable: true })
    TaxDate: Date;

    @Column({ type: 'varchar', length: 11, nullable: true })
    TaxNo: string;

    @Column({ type: 'bit', nullable: true })
    SetLot: boolean;

    @Column({ type: 'bit', nullable: true })
    isService: boolean;

    @Column({ type: 'varchar', length: 500, nullable: true })
    SpecialNote: string;

    @Column({ type: 'varchar', length: 150, nullable: true })
    CompanyName: string;

    @Column({ type: 'int' })
    AddressID: number;

    @Column({ type: 'varchar', length: 200, nullable: true })
    Address: string;

    @Column({ type: 'bit', default: false })
    ReturnStock: boolean;
}
