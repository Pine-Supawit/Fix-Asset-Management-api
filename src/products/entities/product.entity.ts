import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('Products')
export class Product {
    @PrimaryColumn()
    ProductID: string;

    @Column()
    ProductName: string;
}
