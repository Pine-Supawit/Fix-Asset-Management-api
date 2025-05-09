import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import * as bcrypt from "bcrypt";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    emp_id: string;

    @Column({ unique: true })
    username: string;

    @Column()
    password: string;

    @Column()
    phone: string;

    @Column({ nullable: true })
    refreshToken: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

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
