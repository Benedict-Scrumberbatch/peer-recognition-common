import { Entity, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn, Index, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany} from 'typeorm';
import { Users } from './users.entity';
import { Recognition } from './recognition.entity';
import { UserNotification } from './notification.entity';
import { Rockstar } from './rockstar.entity';
import { Comment } from './comment.entity';


@Entity({name: "reaction"})
export class Reaction {
    @PrimaryGeneratedColumn('increment')
    reactionID: number;
    
    @ManyToOne(() => Users)
    employeeFrom: Users;

    @ManyToOne(() => Recognition, Recognition => Recognition.reactions)
    recognition: Recognition ;

    @ManyToOne(() => Rockstar, Rockstar => Rockstar.reactions)
    rockstar: Rockstar ;

    @ManyToOne(() => Comment, Comment => Comment.reactions)
    comment: Comment ;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt?: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt?: Date;

    @DeleteDateColumn({ type: 'timestamp' })
    deletedAt?: Date;

    @OneToMany(() => UserNotification, UserNotification => UserNotification.reaction)
    notifications: UserNotification[];
}