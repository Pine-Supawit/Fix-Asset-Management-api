import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import * as bcrypt from "bcrypt";

@Entity('Users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'nvarchar', length: 255 })
    emp_id: string;

    @Column({ type: 'varchar', length: 255 })
    fname: string;

    @Column({ type: 'varchar', length: 255 })
    lname: string;

    @Column({ type: 'nvarchar', length: 255 })
    password: string;

    @Column({ type: 'nvarchar', length: 255, nullable: true })
    refreshToken: string;

    @CreateDateColumn({ type: 'datetime2' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'datetime2' })
    updatedAt: Date;

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        if (this.password && !this.password.startsWith("$2b$")) {
            const salt = await bcrypt.genSalt();
            this.password = await bcrypt.hash(this.password, salt);
        }
    }

    async comparePassword(plainPassword: string): Promise<boolean> {
        return bcrypt.compare(plainPassword, this.password);
    }

    async setRefreshToken(token: string): Promise<void> {
        const salt = await bcrypt.genSalt();
        this.refreshToken = await bcrypt.hash(token, salt);
    }

    async compareRefreshToken(token: string): Promise<boolean> {
        if (!this.refreshToken) return false;
        return bcrypt.compare(token, this.refreshToken);
    }
}
