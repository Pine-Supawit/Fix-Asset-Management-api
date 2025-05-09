import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity('Ass_AssetList')
export class Asset {

    @PrimaryColumn({ type: 'varchar', length: 20 })
    Asset_ID: string;

    @Column({ type: 'smalldatetime', nullable: true })
    Ass_ReceiveDate?: Date;

    @Column({ type: 'varchar', length: 20, nullable: true })
    Ass_PONum?: string;

    @Column({ type: 'tinyint', nullable: true })
    Ass_Type?: number;

    @Column({ type: 'varchar', length: 50, nullable: true })
    Ass_Location?: string;

    @Column({ type: 'varchar', length: 200, nullable: true })
    Ass_Name?: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    Ass_Brand?: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    Ass_Model?: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    Ass_Serial?: string;

    @Column({ type: 'float', nullable: true })
    Ass_Price?: number;

    @Column({ type: 'varchar', length: 20, nullable: true })
    SupplierID?: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    Ass_Requested?: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    Ass_Responsible?: string;

    @Column({ type: 'smalldatetime', nullable: true })
    Ass_Guarantee?: Date;

    @Column({ type: 'varchar', length: 200, nullable: true })
    Ass_Purpose?: string;

    @Column({ type: 'varchar', length: 150, nullable: true })
    Ass_Pic?: string;

    @Column({ type: 'tinyint', nullable: true })
    Ass_Status?: number;

    @Column({ type: 'varchar', length: 100, nullable: true })
    UserName?: string;

    @Column({ type: 'int', nullable: true })
    CompanyID?: number;

    @Column({ type: 'varchar', length: 5, nullable: true })
    DepartmentCode?: string;

    @Column({ type: 'varchar', length: 20, nullable: true })
    Used_AssetID?: string;

    @Column({ type: 'varchar', length: 20, nullable: true })
    Asset_OldID?: string;

    @Column({ type: 'int', nullable: true })
    Asset_No?: number;

    @Column({ type: 'varchar', length: 500 })
    Ass_Note: string;
}
