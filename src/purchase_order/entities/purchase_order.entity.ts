import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryColumn,
} from 'typeorm';

@Entity('Purchasing')
export class PurchaseOrder {
    @PrimaryColumn()
    PurchaseID: number;

    @Column()
    RevisionID: number;

    @Column({ length: 10 })
    SupplierID: string;

    @Column({ type: 'datetime', nullable: true })
    DateOrder: Date;

    @Column({ length: 20 })
    LotShipment: string;

    @Column({ length: 10 })
    LotShipment237: string;

    @Column({ length: 20 })
    PaymentBy: string;

    @Column({ length: 20 })
    PaymentReference: string;

    @Column({ length: 20 })
    LetterOfCreditNo: string;

    @Column({ type: 'char', length: 1 })
    LetterOfCreditShip: string;

    @Column({ type: 'datetime', nullable: true })
    LetterOfCreditDate: Date;

    @Column({ type: 'datetime', nullable: true })
    EstimateArr1: Date;

    @Column({ type: 'datetime', nullable: true })
    EstimateArr2: Date;

    @Column({ type: 'datetime', nullable: true })
    EstimateArr3: Date;

    @Column({ type: 'datetime', nullable: true })
    EstimateArr4: Date;

    @Column({ type: 'datetime', nullable: true })
    DateArrive: Date;

    @Column('float')
    TotalPrice: number;

    @Column('bit')
    UpdateStock: boolean;

    @Column('text')
    Note: string;

    @Column({ length: 50 })
    VesselName1: string;

    @Column({ length: 50 })
    VesselName2: string;

    @Column({ length: 50 })
    VesselName3: string;

    @Column('bit')
    CancelPO: boolean;

    @Column('bit')
    GetPrice: boolean;

    @Column({ type: 'datetime', nullable: true })
    EstimateDep1: Date;

    @Column({ type: 'datetime', nullable: true })
    EstimateDep2: Date;

    @Column({ type: 'datetime', nullable: true })
    EstimateDep3: Date;

    @Column({ type: 'datetime', nullable: true })
    EstimateDep4: Date;

    @Column({ length: 20 })
    ShippingAgent: string;

    @Column({ length: 50 })
    AgentTel: string;

    @Column({ length: 100 })
    PIC: string;

    @Column({ length: 100 })
    ATTN: string;

    @Column({ length: 50 })
    Delivery_Shipment: string;

    @Column({ length: 50 })
    PaymentTerm: string;

    @Column('bit')
    Condition1: boolean;

    @Column('bit')
    Condition2: boolean;

    @Column('bit')
    Condition3: boolean;

    @Column('bit')
    Condition4: boolean;

    @Column('real')
    VATRate: number;

    @Column('real')
    VAT: number;

    @Column('float')
    GrandTotal: number;

    @Column({ length: 20 })
    PurchaseOfficer: string;

    @Column('bit')
    PrintNote: boolean;

    @Column('smallint')
    Account: number;

    @Column({ type: 'datetime', nullable: true })
    InfoDate1: Date;

    @Column({ type: 'datetime', nullable: true })
    InfoDate2: Date;

    @Column({ type: 'datetime', nullable: true })
    InfoDate3: Date;

    @Column({ type: 'datetime', nullable: true })
    InfoDate4: Date;

    @Column('text')
    NoteForShipmentReport: string;

    @Column({ type: 'datetime', nullable: true })
    PiDate: Date;

    @Column({ type: 'datetime', nullable: true })
    InvDate: Date;

    @Column({ type: 'datetime', nullable: true })
    BLDate: Date;

    @Column({ type: 'datetime', nullable: true })
    TRDate: Date;

    @Column({ type: 'datetime', nullable: true })
    TRDueDate: Date;

    @Column({ length: 50 })
    SPEC: string;

    @Column({ length: 100 })
    InvNo: string;

    @Column('bit')
    UpdateCosting: boolean;

    @Column({ length: 40 })
    Harbor: string;

    @Column({ length: 100 })
    TypePurchase: string;

    @Column('text')
    NoteForCosting: string;

    @Column({ length: 15 })
    HMisExp2: string;

    @Column({ length: 15 })
    HMisExp3: string;

    @Column({ length: 15 })
    HMisExp4: string;

    @Column({ length: 15 })
    HMisExp5: string;

    @Column('bit')
    CostingComplete: boolean;

    @Column('float')
    BalanceOfForwarding: number;

    @Column('float')
    BalanceOfPaid: number;

    @Column('float')
    Freight: number;

    @Column({ length: 260 })
    FWNote: string;

    @Column('float')
    GrandTotalBaht: number;

    @Column({ type: 'char', length: 2 })
    chk: string;

    @Column({ type: 'char', length: 2 })
    SendDate: string;

    @Column({ length: 50 })
    ACKDate: string;

    @Column({ length: 100 })
    BLNo: string;

    @Column({ type: 'datetime', nullable: true })
    SendShippingDate: Date;

    @Column({ length: 30 })
    Feeder: string;

    @Column({ length: 20 })
    TRNO: string;

    @Column({ length: 50 })
    ContainerName: string;

    @Column('tinyint')
    PurchaseType: number;

    @Column('bit')
    OnPort: boolean;

    @Column({ type: 'datetime', nullable: true })
    TargetShipment: Date;

    @Column({ length: 100 })
    PINO: string;

    @Column({ type: 'datetime', nullable: true })
    AdvanceDate: Date;

    @Column({ length: 50 })
    FromPort: string;

    @Column({ length: 50 })
    ToPort: string;

    @Column({ length: 50 })
    InsuranceCompany: string;

    @Column({ length: 50 })
    InsuranceNo: string;

    @Column({ type: 'datetime', nullable: true })
    InsuranceDate: Date;

    @Column({ length: 50 })
    PAID: string;

    @Column({ length: 100 })
    PRNo: string;

    @Column({ type: 'datetime', nullable: true })
    PRDate: Date;

    @Column({ length: 5 })
    CP: string;

    @Column('tinyint')
    PCGroup: number;

    @Column({ length: 5 })
    PCSubGroup: string;

    @Column({ type: 'char', length: 2 })
    PRDivision: string;

    @Column({ type: 'char', length: 2 })
    ForDivision: string;

    @Column({ length: 10 })
    JRID: string;

    @Column('float')
    BalanceOfPayment: number;

    @Column('bit')
    isQuotation: boolean;

    @Column('bit')
    isInvoice: boolean;

    @Column('bit')
    isBilling: boolean;

    @Column('bit')
    isReceipt: boolean;

    @Column({ type: 'datetime', nullable: true })
    SendDocDate: Date;

    @Column({ type: 'datetime', nullable: true })
    ReceiveDocDate: Date;

    @Column({ length: 200, nullable: true })
    IncompleteNote: string;

    @Column({ type: 'bit', nullable: true })
    DocComplete: boolean;

    @Column({ length: 15, nullable: true })
    ReceiveLocation: string;

    @Column({ type: 'float', nullable: true })
    TotalDiscount: number;

    @Column({ type: 'text', nullable: true })
    NoteForApprove: string;

    @Column({ length: 512, nullable: true })
    UploadCompare: string;

    @Column({ length: 3, nullable: true })
    Company: string;

    @Column({ length: 30, nullable: true })
    ApprovedBy: string;

    @Column({ type: 'datetime', nullable: true })
    ApprovedDate: Date;

    @Column({ type: 'int', nullable: true })
    ApprovedStaus: number;
}
