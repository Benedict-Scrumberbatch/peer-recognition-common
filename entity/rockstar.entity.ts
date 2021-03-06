import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, Index, ManyToMany, JoinColumn, UpdateDateColumn, DeleteDateColumn, OneToMany } from 'typeorm';
import { Users } from './users.entity';
import { Recognition } from './recognition.entity';
import { RockstarStats } from './rockstarstats.entity';
import { UserNotification } from './notification.entity';
import { Comment } from './comment.entity';
import { Reaction } from './reaction.entity';

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

    @OneToMany(() => Comment, Comment => Comment.rockstar)
    comments: Comment[];

    @OneToMany(() => Reaction, Reaction => Reaction.rockstar)
    reactions?: Reaction[];

    @Column()
    compID: number;
    
    @OneToMany(() => RockstarStats, RockstarStats => RockstarStats.rockstar)
    stats: RockstarStats[];

    @OneToMany(() => Recognition, Recognition => Recognition.rockstar)
    recognitions: Recognition[];

    @ManyToOne(() => Users)
    rockstar: Users;

}