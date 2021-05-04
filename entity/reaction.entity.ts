import { Entity, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn, Index, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany} from 'typeorm';
import { Users } from './users.entity';
import { Recognition } from './recognition.entity';
import { ReactType} from '../enum/reacttype.enum';
import { UserNotification } from './notification.entity';

@Entity({name: "reaction"})
@Index(["employeeFrom","recognition","reactType"], {unique: true})
export class Reaction {
    @PrimaryGeneratedColumn('increment')
    reactionID: number;
    
    @ManyToOne(() => Users)
    @JoinColumn()
    employeeFrom: Users;

    @ManyToOne(() => Recognition, Recognition => Recognition.reactions)
    recognition: Recognition ;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt?: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt?: Date;

    @DeleteDateColumn({ type: 'timestamp' })
    deletedAt?: Date;

    @OneToMany(() => UserNotification, UserNotification => UserNotification.reaction)
    notifications: UserNotification[];

    @Column({ 
        type: "enum", 
        enum: ReactType, 
        default: ReactType.Like})
    reactType: ReactType;

}