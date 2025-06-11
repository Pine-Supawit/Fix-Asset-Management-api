import {
    Entity,
    PrimaryColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('DetailedPurchasing')
export class PurchaseOrderDetail {
    @PrimaryColumn()
    PurchaseID: number;

    @PrimaryColumn()
    RevisionID: number;

    @PrimaryColumn()
    No: number;

    @Column({ type: 'varchar', length: 10, nullable: true })
    ProductID: string;

    @Column({ type: 'varchar', length: 20, nullable: true })
    LotSupplier1: string;

    @Column({ type: 'varchar', length: 20, nullable: true })
    LotSupplier2: string;

    @Column({ type: 'varchar', length: 20, nullable: true })
    LotSupplier3: string;

    @Column({ type: 'varchar', length: 20, nullable: true })
    LotSupplier4: string;

    @Column({ type: 'varchar', length: 20, nullable: true })
    LotSupplier5: string;

    @Column({ type: 'float', nullable: true })
    Quantity1: number;

    @Column({ type: 'float', nullable: true })
    Quantity2: number;

    @Column({ type: 'float', nullable: true })
    Quantity3: number;

    @Column({ type: 'float', nullable: true })
    Quantity4: number;

    @Column({ type: 'float', nullable: true })
    Quantity5: number;

    @Column({ type: 'float', nullable: true })
    TotalQty: number;

    @Column({ type: 'varchar', length: 5, nullable: true })
    Unit: string;

    @Column({ type: 'float', nullable: true })
    UnitCost: number;

    @Column({ type: 'varchar', length: 10, nullable: true })
    Currency: string;

    @Column({ type: 'varchar', length: 10, nullable: true })
    Per: string;

    @Column({ type: 'float', nullable: true })
    AmtQty: number;

    @Column({ type: 'float', nullable: true })
    Amount: number;

    @Column({ type: 'varchar', length: 15, nullable: true })
    SProductID: string;

    @Column({ type: 'varchar', nullable: true }) // varchar(MAX)
    SProductName: string;

    @Column({ type: 'char', length: 1, nullable: true })
    Packing: string;

    @Column({ type: 'float', nullable: true })
    GTotalQty: number;

    @Column({ type: 'varchar', length: 5, nullable: true })
    GPUnit: string;

    @Column({ type: 'float', nullable: true })
    GPUnitCost: number;

    @Column({ type: 'bit', nullable: true })
    GShow: boolean;

    @Column({ type: 'float', nullable: true })
    UnitCostBaht: number;

    @Column({ type: 'int', nullable: true })
    LotID1: number;

    @Column({ type: 'int', nullable: true })
    LotID2: number;

    @Column({ type: 'int', nullable: true })
    LotID3: number;

    @Column({ type: 'int', nullable: true })
    LotID4: number;

    @Column({ type: 'int', nullable: true })
    LotID5: number;

    @Column({ type: 'real', nullable: true })
    ExchangeRate: number;

    @Column({ type: 'float', nullable: true })
    Purchase: number;

    @Column({ type: 'float', nullable: true })
    Freight: number;

    @Column({ type: 'real', nullable: true })
    ImportDutyRate: number;

    @Column({ type: 'float', nullable: true })
    ImportDutyAmount: number;

    @Column({ type: 'float', nullable: true })
    Tax: number;

    @Column({ type: 'float', nullable: true })
    Shipping: number;

    @Column({ type: 'float', nullable: true })
    MisExp1: number;

    @Column({ type: 'float', nullable: true })
    MisExp2: number;

    @Column({ type: 'float', nullable: true })
    MisExp3: number;

    @Column({ type: 'float', nullable: true })
    MisExp4: number;

    @Column({ type: 'float', nullable: true })
    MisExp5: number;

    @Column({ type: 'float', nullable: true })
    CostOfProduct: number;

    @Column({ type: 'float', nullable: true })
    CostPerUnit: number;

    @Column({ type: 'char', length: 2, nullable: true })
    chk: string;

    @Column({ type: 'varchar', length: 500, nullable: true })
    PriceNote: string;

    @Column({ type: 'varchar', length: 30, nullable: true })
    H_Quality1: string;

    @Column({ type: 'varchar', length: 30, nullable: true })
    H_Quality2: string;

    @Column({ type: 'varchar', length: 30, nullable: true })
    Status: string;

    @Column({ type: 'varchar', length: 30, nullable: true })
    H_Quality4: string;

    @Column({ type: 'varchar', length: 30, nullable: true })
    H_Quality5: string;

    @Column({ type: 'varchar', length: 30, nullable: true })
    H_Quality6: string;

    @Column({ type: 'varchar', length: 30, nullable: true })
    H_Quality7: string;

    @Column({ type: 'varchar', length: 30, nullable: true })
    H_Quality8: string;

    @Column({ type: 'varchar', length: 30, nullable: true })
    H_Quality9: string;

    @Column({ type: 'varchar', length: 30, nullable: true })
    H_QualityA: string;

    @Column({ type: 'varchar', length: 20, nullable: true })
    D_Quality1: string;

    @Column({ type: 'varchar', length: 20, nullable: true })
    D_Quality2: string;

    @Column({ type: 'varchar', length: 20, nullable: true })
    D_Quality3: string;

    @Column({ type: 'varchar', length: 20, nullable: true })
    D_Quality4: string;

    @Column({ type: 'varchar', length: 20, nullable: true })
    D_Quality5: string;

    @Column({ type: 'varchar', length: 20, nullable: true })
    D_Quality6: string;

    @Column({ type: 'varchar', length: 20, nullable: true })
    D_Quality7: string;

    @Column({ type: 'varchar', length: 20, nullable: true })
    D_Quality8: string;

    @Column({ type: 'varchar', length: 20, nullable: true })
    D_Quality9: string;

    @Column({ type: 'varchar', length: 20, nullable: true })
    D_QualityA: string;

    @Column({ type: 'varchar', length: 20, nullable: true })
    A_Quality1: string;

    @Column({ type: 'varchar', length: 20, nullable: true })
    A_Quality2: string;

    @Column({ type: 'varchar', length: 20, nullable: true })
    A_Quality3: string;

    @Column({ type: 'varchar', length: 20, nullable: true })
    A_Quality4: string;

    @Column({ type: 'varchar', length: 20, nullable: true })
    A_Quality5: string;

    @Column({ type: 'varchar', length: 20, nullable: true })
    A_Quality6: string;

    @Column({ type: 'varchar', length: 20, nullable: true })
    A_Quality7: string;

    @Column({ type: 'varchar', length: 20, nullable: true })
    A_Quality8: string;

    @Column({ type: 'varchar', length: 20, nullable: true })
    A_Quality9: string;

    @Column({ type: 'varchar', length: 20, nullable: true })
    A_QualityA: string;

    @Column({ type: 'int', nullable: true })
    PackID: number;

    @Column({ type: 'tinyint', nullable: true })
    PCGroup: number;

    @Column({ type: 'tinyint', nullable: true })
    PCSubGroup: number;

    @Column({ type: 'varchar', length: 10, nullable: true })
    AssetID: string;

    @Column({ type: 'char', length: 2, nullable: true })
    ForDivision: string;

    @Column({ type: 'float', nullable: true })
    Discount: number;

    @Column({ type: 'float', nullable: true })
    SharingDisCount: number;

    @Column({ type: 'varchar', length: 12, nullable: true })
    PRNo: string;

    @Column({ type: 'int', nullable: true })
    PRItem: number;

    @CreateDateColumn({ type: 'datetime' })
    CreatedAt: Date;

    @UpdateDateColumn({ type: 'datetime' })
    UpdatedAt: Date;
}
