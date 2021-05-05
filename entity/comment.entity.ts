import { Entity, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn, Index, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany} from 'typeorm';
import { Users } from './users.entity';
import { Recognition } from './recognition.entity';
import { UserNotification } from './notification.entity';
import { Report } from './report.entity';


@Entity({name: "comment"})
@Index(["employeeFrom","recognition", "createdAt"], {unique: true})
export class Comment {
    @PrimaryGeneratedColumn('increment')
    commentID: number;

    @Column()
    msg: string;

    @OneToMany(() => UserNotification, UserNotification => UserNotification.comment)
    notifications: UserNotification[];

    @OneToMany(() => Report, Report => Report.comment)
    reports: Report[];
    
    @ManyToOne(() => Users)
    @JoinColumn()
    employeeFrom: Users;

    @ManyToOne(() => Recognition, Recognition => Recognition.comments)
    recognition: Recognition ;

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