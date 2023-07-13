import { Exclude } from "class-transformer";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Alert } from './alert.entity';

@Entity({"name": "users"})
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuidv4();

    @Column({unique: true})
    email: string;

    @Column({unique: true})
    username: string;

    @Column()
    biography: string = "";

    @Column()
    password: string;

    @Column()
    lastActive: Date = new Date();

    @Column()
    isVerified: boolean = false;

    @Column("text", { array: true, default: [] })
    followers: string[];

    @Column()
    avatar: string = "/statics/avatars/default.png";

    @OneToMany(() => Alert, (alert) => alert.owner)
    @JoinColumn()
    alerts: Alert[];

    @Column({nullable: true})
    hashedRt: string;

    @Column()
    createdAt: Date = new Date();
}

export class SerializedUser {
    id: string;
    email: string;
    username: string;

    @Exclude()
    password: string;

    @Exclude()
    hashedRt: string;

    alerts: Alert[];
    biography: string = "";
    followers: string[] = [];
    isVerified: boolean = false;
    avatar: string = "/statics/avatars/default.png";
    createdAt: Date = new Date();
}