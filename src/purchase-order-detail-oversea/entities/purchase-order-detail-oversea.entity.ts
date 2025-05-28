import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: 'PurchaseOrderDetailed', schema: 'dbo' })
export class PurchaseOrderDetailOversea {

    @PrimaryColumn()
    PurchaseID: number;

    @PrimaryColumn()
    No: number;

    @Column({ length: 10 })
    ProductID: string;

    @Column('float')
    Quantity: number;

    @Column({ length: 5 })
    Unit: string;

    @Column('float')
    UnitCost: number;

    @Column()
    Packing: number;

    @Column('float')
    Amount: number;

    @Column({ length: 60 })
    SProductName: string;

    @Column({ type: 'bit' })
    PrintSpec: boolean;

    @Column({ type: 'nvarchar', length: 'MAX' })
    ProductSpace: string;
}
