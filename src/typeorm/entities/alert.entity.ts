import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { User } from './user.entity';

@Entity({"name": "alerts"})
export class Alert {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuidv4();

    @ManyToOne(() => User, (user) => user.alerts)
    @JoinColumn()
    owner?: User;

    @ManyToOne(() => User, (user) => user.alerts)
    @JoinColumn()
    recipient?: User;

    @Column()
    tag?: string;

    @Column()
    createdAt: Date = new Date();
}