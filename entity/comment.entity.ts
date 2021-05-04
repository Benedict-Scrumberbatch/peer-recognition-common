import { Entity, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn, Index, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany} from 'typeorm';
import { Users } from './users.entity';
import { Recognition } from './recognition.entity';
import { UserNotification } from './notification.entity';

@Entity({name: "comment"})
@Index(["employeeFrom","recognition", "createdAt"], {unique: true})
export class Comment {
    @PrimaryGeneratedColumn('increment')
    commentID: number;

    @Column()
    msg: string;

    @OneToMany(() => UserNotification, UserNotification => UserNotification.comment)
    notifications: UserNotification[];
    
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

}