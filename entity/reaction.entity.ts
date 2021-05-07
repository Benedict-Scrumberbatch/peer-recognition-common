import { Entity, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn, Index, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany} from 'typeorm';
import { Users } from './users.entity';
import { Recognition } from './recognition.entity';
import { UserNotification } from './notification.entity';

@Entity({name: "reaction"})
@Index(["employeeFrom","recognition"], {unique: true})
export class Reaction {
    @PrimaryGeneratedColumn('increment')
    reactionID: number;
    
    @ManyToOne(() => Users)
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
}