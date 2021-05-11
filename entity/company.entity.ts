import { Entity, Column, PrimaryColumn, OneToMany, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, BeforeInsert, getRepository } from 'typeorm';
import { Tag } from "./tag.entity";
import { Recognition } from "./recognition.entity";
import { Users } from './users.entity';

@Entity({name: "company"})
export class Company {
    @PrimaryColumn()
    companyId: number;

    @BeforeInsert()
    async setId() {
        if (!this.companyId) {
            const companies = await getRepository(Company).find({take: 5, order: {companyId:'DESC'}});
            if (companies.length > 0) {
                this.companyId = companies[0].companyId + 1;
            } else {
                this.companyId = 1;
            }
        }
    }
    
    @Column()
    name: string;

    @OneToMany(()=>Tag, tag=>tag.company)
    @JoinColumn()
    tags: Tag[];

    @OneToMany(()=>Recognition, rec=>rec.company)
    recognitions: Recognition[];

    @OneToMany(()=>Users, user => user.company)
    users: Users[];

    @CreateDateColumn({ type: 'timestamp' })
    createdAt?: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt?: Date;

    @DeleteDateColumn({ type: 'timestamp' })
    deletedAt?: Date;
}
