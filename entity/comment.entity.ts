import { Entity, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn, Index, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany} from 'typeorm';
import { Users } from './users.entity';
import { Recognition } from './recognition.entity';
import { UserNotification } from './notification.entity';
import { Report } from './report.entity';
import { Rockstar } from './rockstar.entity';
import { Reaction } from './reaction.entity';


@Entity({name: "comment"})
export class Comment {
    @PrimaryGeneratedColumn('increment')
    commentID: number;

    @Column()
    msg: string;

    @OneToMany(() => UserNotification, UserNotification => UserNotification.comment)
    notifications: UserNotification[];

    @OneToMany(() => Report, Report => Report.comment)
    reports: Report[];

    
    @OneToMany(() => Reaction, Reaction => Reaction.comment)
    reactions: Reaction[];
    
    @ManyToOne(() => Users)
    @JoinColumn()
    employeeFrom: Users;

    @ManyToOne(() => Recognition, Recognition => Recognition.comments)
    recognition: Recognition ;

    @ManyToOne(() => Rockstar, Rockstar => Rockstar.comments)
    rockstar: Rockstar ;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt?: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt?: Date;

    @DeleteDateColumn({ type: 'timestamp' })
    deletedAt?: Date;

    @ManyToOne(()=>Users, users=>users.commentsDeleted)
    @JoinColumn()
    deletedBy?: Users;
}