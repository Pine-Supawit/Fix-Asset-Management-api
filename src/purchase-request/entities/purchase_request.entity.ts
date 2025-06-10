import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity('PurchaseRequest')
export class PurchaseRequest {

    @PrimaryColumn({ type: 'varchar', length: 12 })
    PRNO: string;

    @Column({ type: 'smalldatetime' })
    RequestDate: Date;

    @Column({ type: 'varchar', length: 30 })
    RequestBy: string;

    @Column({ type: 'char', length: 2 })
    Division: string;

    @Column({ type: 'char', length: 3, nullable: true })
    SubDivision?: string;

    @Column({ type: 'varchar', length: 250 })
    Purpose: string;

    @Column({ type: 'varchar', length: 30, nullable: true })
    ApprovedBy?: string;

    @Column({ type: 'varchar', length: 30, nullable: true })
    ApprovedFor?: string;

    @Column({ type: 'smalldatetime', nullable: true })
    ApprovedDate?: Date;

    @Column({ type: 'varchar', length: 30 })
    EnterBy: string;

    @Column({ type: 'smalldatetime' })
    EnterDate: Date;

    @Column({ type: 'varchar', length: 30, nullable: true })
    EditBy?: string;

    @Column({ type: 'smalldatetime', nullable: true })
    EditDate?: Date;

    @Column({ type: 'int', nullable: true })
    PurchaseID?: number;

    @Column({ type: 'tinyint' })
    Status: number;

    @Column({ type: 'varchar', length: 'MAX', nullable: true })
    Note?: string;

    @Column({ type: 'varchar', length: 250, nullable: true })
    ApproveNote?: string;

    @Column({ type: 'tinyint', nullable: true })
    PCGroup?: number;

    @Column({ type: 'tinyint', nullable: true })
    PCSubGroup?: number;

    @Column({ type: 'char', length: 2, nullable: true })
    ForDivision?: string;

    @Column({ type: 'char', length: 3, nullable: true })
    ForSubDivision?: string;

    @Column({ type: 'varchar', length: 20, nullable: true })
    RepairNo?: string;

    @Column({ type: 'bit' })
    NeedMM: boolean;

    @Column({ type: 'smalldatetime', nullable: true })
    AcknowledgeDate?: Date;

    @Column({ type: 'varchar', length: 30, nullable: true })
    AcknowledgeBy?: string;

    @Column({ type: 'varchar', length: 250, nullable: true })
    AcknowledgeNote?: string;

    @Column({ type: 'smalldatetime', nullable: true })
    ReceiveDate?: Date;

    @Column({ type: 'int', nullable: true })
    PriorityScorce?: number;

    @Column({ type: 'varchar', length: 256, nullable: true })
    CauseNotApprove?: string;

    @Column({ type: 'int', nullable: true })
    CauseID?: number;

    @Column({ type: 'varchar', length: 50, nullable: true })
    PurposeFor?: string;
}
