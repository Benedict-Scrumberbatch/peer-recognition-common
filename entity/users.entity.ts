import { Entity, Column, PrimaryColumn, JoinColumn, OneToMany, ManyToOne, OneToOne, Index, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, BeforeInsert, getRepository } from 'typeorm';
import { Company } from "./company.entity";
import { Login } from './login.entity';
import { Recognition } from "./recognition.entity";
import { Role } from "../enum/role.enum";
import { TagStats} from './tagstats.entity';
import { Report } from './report.entity';
import { Rockstar} from './rockstar.entity';
import { Comment } from './comment.entity';

@Entity({name: "users"})
@Index(['companyId', 'employeeId'], {unique: true})
export class Users {
    
    @ManyToOne(()=>Company, {primary: true} )
    @JoinColumn({name: "companyId", referencedColumnName: "companyId"})
    company?: Company;
    
    // This looks duplicated, but don't delete it. It is just the same as the JoinColumn. 
    // This is necessary to make the foreign key also act as a primary key for Users.
    @PrimaryColumn()
    companyId?: number;

    @PrimaryColumn()
    employeeId?: number;

    @BeforeInsert()
    async setId() {
        if (!this.employeeId && this.employeeId !== 0) {
            const users = await getRepository(Users).find({where: {companyId: this.companyId}, take: 5, order: {employeeId:'DESC'}});
            if (users && users.length > 0) {
                this.employeeId = users[0].employeeId! + 1;
            } 
        }
    }

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    positionTitle?: string;

    @Column()
    isManager?: boolean;

    @Column({ 
        type: "enum", 
        enum: Role, 
        default: Role.Employee})
    role?: Role;

    @Column("timestamp")
    startDate?: Date;

    @Column({nullable: true, type:'int'})
    managerId?: number;

    @OneToMany(()=>Recognition, rec=>rec.empFrom)
    recsSent?: Recognition[];

    @OneToMany(()=>Recognition, rec=>rec.empTo)
    recsReceived?: Recognition[];

    @Column({default: 0})
    numRecsReceived?: number;

    @Column({default: 0})
    numRecsSent?: number;

    // This relation was making it impossible to create rows in the table.
    @OneToOne(() => Login, login => login.employee)
    login?: Login;

    @OneToMany(() => TagStats, tagstats => tagstats.employee)
    tagStats?: TagStats[];

    @OneToMany(()=>Recognition, rec=>rec.deletedBy)
    recsDeleted?: Recognition[];

    @OneToMany(()=>Comment, comment=>comment.deletedBy)
    commentsDeleted?: Comment[];

    @OneToMany(() => Report, report=>report.employeeFrom)
    report?: Report[];

    @OneToMany(() => Rockstar, rockstar=>rockstar.rockstar)
    rockstar?: Rockstar[];

    @CreateDateColumn({ type: 'timestamp' })
    createdAt?: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt?: Date;

    @DeleteDateColumn({ type: 'timestamp' })
    deletedAt?: Date;
}