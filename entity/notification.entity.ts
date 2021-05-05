import { Entity, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn,  Index, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { Users } from './users.entity';
import { Recognition } from './recognition.entity';
import { Rockstar } from './rockstar.entity';
import { Report } from './report.entity';
import { Reaction } from './reaction.entity';
import { Comment } from './comment.entity';
import { NotificationType } from '../enum/notification-types';

@Entity({name: "notification"})
@Index(["employeeTo","createdAt"], {unique: true})
export class UserNotification {
    @PrimaryGeneratedColumn('increment')
    notificationID: number;
    
    @ManyToOne(() => Users)
    @JoinColumn()
    employeeTo: Users;

    @Column({ 
        type: "enum", 
        enum: NotificationType, 
        default: NotificationType.Generic})
    notificationType: NotificationType;

    @ManyToOne(() => Recognition, Recognition => Recognition.notifications)
    recognition: Recognition ;

    @ManyToOne(() => Report, Report => Report.notifications)
    report: Report ;

    @ManyToOne(() => Rockstar, Rockstar => Rockstar.notifications)
    rockstar: Rockstar ;

    @ManyToOne(() => Comment, Comment => Comment.notifications)
    comment: Comment ;

    @ManyToOne(() => Reaction, Reaction => Reaction.notifications)
    reaction: Reaction ;

    @Column()
    msg: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt?: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt?: Date;

    @DeleteDateColumn({ type: 'timestamp' })
    deletedAt?: Date;

}