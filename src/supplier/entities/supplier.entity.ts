import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('off_Supplier')
export class Supplier {
    @PrimaryColumn({ type: 'varchar', length: 10 })
    SupplierID: string;

    @Column({ type: 'varchar', length: 200, nullable: true })
    SupplierName?: string;

    @Column({ type: 'varchar', length: 500, nullable: true })
    Address?: string;

    @Column({ type: 'varchar', length: 200, nullable: true })
    Tel?: string;

    @Column({ type: 'varchar', length: 200, nullable: true })
    Fax?: string;

    @Column({ type: 'varchar', length: 500, nullable: true })
    ProductLine?: string;

    @Column({ type: 'varchar', length: 300, nullable: true })
    Contact1?: string;

    @Column({ type: 'varchar', length: 300, nullable: true })
    Contact2?: string;

    @Column({ type: 'varchar', length: 300, nullable: true })
    Contact3?: string;

    @Column({ type: 'varchar', length: 300, nullable: true })
    Contact4?: string;

    @Column({ type: 'varchar', length: 300, nullable: true })
    Contact5?: string;

    @Column({ type: 'varchar', length: 90, nullable: true })
    BankName?: string;

    @Column({ type: 'varchar', length: 500, nullable: true })
    BankAddress?: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    Beneficiary?: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    AccountNo?: string;

    @Column({ type: 'varchar', length: 20, nullable: true })
    PineAccountNo?: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    PaymentTerm?: string;

    @Column({ type: 'varchar', length: 150, nullable: true })
    Contact1Tel?: string;

    @Column({ type: 'varchar', length: 150, nullable: true })
    Contact2Tel?: string;

    @Column({ type: 'varchar', length: 150, nullable: true })
    Contact3Tel?: string;

    @Column({ type: 'varchar', length: 150, nullable: true })
    Contact4Tel?: string;

    @Column({ type: 'varchar', length: 150, nullable: true })
    Contact5Tel?: string;

    @Column({ type: 'varchar', length: 11, nullable: true })
    AccCode?: string;

    @Column({ type: 'char', length: 15, nullable: true })
    AcctNum?: string;

    @Column({ type: 'varchar', length: 10, nullable: true })
    Shortname?: string;

    @Column({ type: 'smalldatetime', nullable: true })
    ContactDate?: Date;

    @Column({ type: 'varchar', length: 1000, nullable: true })
    BackgroundContact?: string;

    @Column({ type: 'tinyint', nullable: true })
    PurchaseType?: number;

    @Column({ type: 'varchar', length: 3, nullable: true })
    PaymentBy?: string;

    @Column({ type: 'varchar', length: 30, nullable: true })
    PaymentReference?: string;

    @Column({ type: 'varchar', length: 30, nullable: true })
    PurchaseOfficer?: string;

    @Column({ type: 'varchar', length: 15, nullable: true })
    ForCompany?: string;

    @Column({ type: 'varchar', length: 30, nullable: true })
    CreateBy?: string;

    @Column({ type: 'smalldatetime', nullable: true })
    CreateDate?: Date;

    @Column({ type: 'varchar', length: 30, nullable: true })
    EditBy?: string;

    @Column({ type: 'smalldatetime', nullable: true })
    EditDate?: Date;

    @Column({ type: 'varchar', length: 80, nullable: true })
    MapFile?: string;
}
