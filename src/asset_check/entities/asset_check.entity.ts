import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from 'typeorm';

@Entity('Ass_AssChecklist')
export class AssetChecklist {
    @PrimaryColumn()
    AssChecklist_ID: string;

    @Column({ type: 'datetime', nullable: true })
    AssCheckList_Date: Date;

    @Column({ type: 'varchar', length: 50, nullable: true })
    AssCheckList_Checked: string;

    @Column({ type: 'int', nullable: true })
    CompanyID: number;

    @Column({ type: 'varchar', length: 5, nullable: true })
    DepartmentCode: string;

    @Column({ type: 'tinyint', nullable: true })
    Ass_Type: number;

    @Column({ type: 'varchar', length: 150, nullable: true })
    Ass_Responsible: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    Ass_Location: string;

    @Column({ type: 'bit', nullable: true })
    CheckList_Status: boolean;

    @Column({ type: 'smalldatetime', nullable: true })
    Date_CheckComplete: Date;

    @Column({ type: 'varchar', length: 500, nullable: true })
    Note_Check: string;

    @Column({ type: 'varchar', nullable: true })
    Year_Quarter: string;

    @Column({ type: 'tinyint', nullable: true })
    Quarter: number;

    @Column({ type: 'smalldatetime', nullable: true })
    PlanStart: Date;

    @Column({ type: 'smalldatetime', nullable: true })
    PlanEnd: Date;

    @Column({ type: 'smalldatetime', nullable: true })
    ActualStart: Date;

    @Column({ type: 'smalldatetime', nullable: true })
    ActualEnd: Date;
}
