import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, JoinTable, ManyToOne, Index, ManyToMany, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany } from 'typeorm';
import { Company } from "./company.entity";
import { Users } from "./users.entity";
import { Tag } from "./tag.entity";
import { Report } from './report.entity';
import { Rockstar } from './rockstar.entity';
import { Comment } from './comment.entity';
import { Reaction } from './reaction.entity';
import { UserNotification } from './notification.entity'

@Entity({name: "recognition"})
@Index(["empFrom", "empTo", "createdAt"])
export class Recognition {
    @PrimaryGeneratedColumn()
    recId: number;

    @ManyToOne(()=> Company, company=>company.recognitions)
    company: Company;

    @ManyToOne(()=> Users, users=>users.recsSent)
    @JoinColumn()
    empFrom: Users;

    @ManyToOne(()=> Users, users=>users.recsReceived)
    @JoinColumn()
    empTo: Users;

    @ManyToMany(()=>Tag, tag=>tag.rec)
    @JoinTable()
    tags: Tag[];

    @Column()
    msg: string;

    @OneToMany(() => Report, Report => Report.recognition)
    reports: Report[];

    @OneToMany(() => Comment, Comment => Comment.recognition)
    comments: Comment[];

    @OneToMany(() => UserNotification, UserNotification => UserNotification.recognition)
    notifications: UserNotification[];

    @OneToMany(() => Reaction, Reaction => Reaction.recognition)
    reactions: Reaction[];

    @CreateDateColumn({ type: 'timestamp' })
    createdAt?: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt?: Date;

    @DeleteDateColumn({ type: 'timestamp' })
    deletedAt?: Date;

    @ManyToOne(()=>Users, users=>users.recsDeleted)
    @JoinColumn()
    deletedBy?: Users;

    @ManyToOne(()=>Rockstar, rockstar=>rockstar.recognitions, {nullable: true})
    rockstar?: Rockstar;
}