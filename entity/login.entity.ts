import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm';
import { Users } from "./users.entity";

@Entity({name: "login"})
export class Login {
    @PrimaryColumn()
    email: string;

    @Column()
    password: string;

    @OneToOne(() => Users)
    @JoinColumn()
    employee: Users;

}