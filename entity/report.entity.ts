import { Entity, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn,  Index, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany } from 'typeorm';
import { Users } from './users.entity';
import { Recognition } from './recognition.entity';
import { UserNotification } from './notification.entity';

@Entity({name: "report"})
@Index(["employeeFrom","recognition","createdAt"], {unique: true})
export class Report {
    @PrimaryGeneratedColumn('increment')
    reportID: number;
    
    @ManyToOne(() => Users)
    @JoinColumn()
    employeeFrom: Users;

    @ManyToOne(() => Recognition, Recognition => Recognition.reports)
    recognition: Recognition ;

    @OneToMany(() => UserNotification, UserNotification => UserNotification.report)
    notifications: UserNotification[];

    @CreateDateColumn({ type: 'timestamp' })
    createdAt?: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt?: Date;

    @DeleteDateColumn({ type: 'timestamp' })
    deletedAt?: Date;

}