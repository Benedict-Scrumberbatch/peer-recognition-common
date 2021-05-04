import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { Users } from "./users.entity";

@Entity({name: "login"})
export class Login {
    @PrimaryColumn()
    email: string;

    @Column()
    password: string;

    @OneToOne(() => Users, users => users.login)
    @JoinColumn()
    employee: Users;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt?: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt?: Date;

    @DeleteDateColumn({ type: 'timestamp' })
    deletedAt?: Date;
}