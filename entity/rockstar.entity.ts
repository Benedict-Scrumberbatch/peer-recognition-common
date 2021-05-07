import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, Index, ManyToMany, JoinColumn, UpdateDateColumn, DeleteDateColumn, OneToMany } from 'typeorm';
import { Users } from './users.entity';
import { Recognition } from './recognition.entity';
import { RockstarStats } from './rockstarstats.entity';
import { UserNotification } from './notification.entity';

@Entity({name: "rockstar"})
@Index(["compID", "month", "year"], {unique: true})
export class Rockstar {
    @PrimaryGeneratedColumn('increment')
    rockstarID: number;

    @Column()
    month: number;

    @Column()
    year: number; 

    @OneToMany(() => UserNotification, UserNotification => UserNotification.rockstar)
    notifications: UserNotification[];

    @Column()
    compID: number
    
    @OneToMany(() => RockstarStats, RockstarStats => RockstarStats.rockstar)
    stats: RockstarStats[];

    @ManyToOne(() => Users)
    rockstar: Users;

}