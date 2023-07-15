import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from './user.entity';

@Entity({"name": "chats"})
export class Chat {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToMany(() => User, (user) => user)
    members: string[]

    @Column()
    createdAt: Date = new Date();
}