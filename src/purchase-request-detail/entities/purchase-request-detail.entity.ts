import {
    Entity,
    PrimaryColumn,
    Column,
} from 'typeorm';

@Entity('PurchaseRequestDetail')
export class PurchaseRequestDetail {
    @PrimaryColumn({ type: 'varchar', length: 12 })
    PRNO: string;

    @PrimaryColumn({ type: 'tinyint' })
    ItemNo: number;

    @Column({ type: 'varchar', length: 10, nullable: true })
    ProductGroupID?: string;

    @Column({ type: 'varchar', length: 512, nullable: true })
    Detail?: string;

    @Column({ type: 'varchar', length: 20, nullable: true })
    Code?: string;

    @Column({ type: 'float', nullable: true })
    Quantity?: number;

    @Column({ type: 'varchar', length: 10, nullable: true })
    Unit?: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    Note?: string;

    @Column({ type: 'tinyint', nullable: true })
    PCGroup?: number;

    @Column({ type: 'tinyint', nullable: true })
    PCSubGroup?: number;

    @Column({ type: 'int', nullable: true })
    PurchaseID?: number;

    @Column({ type: 'tinyint', nullable: true })
    PurchaseItem?: number;

    @Column({ type: 'varchar', length: 50, nullable: true })
    Model?: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    Material?: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    Color?: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    Size?: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    Brand?: string;

    @Column({ type: 'float', nullable: true })
    Weight?: number;

    @Column({ type: 'varchar', length: 50, nullable: true })
    WorkType?: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    DescriptionType?: string;

    @Column({ type: 'bit', nullable: true })
    isCancel?: boolean;

    @Column({ type: 'varchar', length: 100, nullable: true })
    CancelNote?: string;

    @Column({ type: 'varchar', length: 30, nullable: true })
    CancelBy?: string;

    @Column({ type: 'smalldatetime', nullable: true })
    CancelDate?: Date;

    @Column({ type: 'bit', nullable: true })
    SpecialSpec?: boolean;

    @Column({ type: 'smalldatetime', nullable: true })
    Receive?: Date;

    @Column({ type: 'varchar', length: 30, nullable: true })
    ReceiveBy?: string;

    @Column({ type: 'int', nullable: true })
    CauseID?: number;

    @Column({ type: 'smalldatetime', nullable: true })
    CauseDate?: Date;

    @Column({ type: 'varchar', length: 100, nullable: true })
    Capacity?: string;

    @Column({ type: 'varchar', length: 250, nullable: true })
    SpecailFuture?: string;

    @Column({ type: 'bit', nullable: true })
    NeedMM?: boolean;

    @Column({ type: 'varchar', length: 256, nullable: true })
    AnswerApprove?: string;

    @Column({ type: 'float', nullable: true })
    Price?: number;

    @Column({ type: 'varchar', length: 50, nullable: true })
    EstimatePrice?: string;

    @Column({ type: 'varchar', length: 10, nullable: true })
    ProductID?: string;

    @Column({ type: 'float', nullable: true })
    UnitCostBaht?: number;

    @Column({ type: 'int' })
    PackID: number;
}
