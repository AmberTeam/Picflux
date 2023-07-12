import { Exclude } from "class-transformer";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({"name": "users"})
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    isVerified: boolean = false;

    @Column()
    avatar: string = "";

    @Column()
    createdAt: Date = new Date();
}

export class SerializedUser {
    id: number;
    email: string;
    username: string;

    @Exclude()
    password: string;

    isVerified: boolean = false;
    avatar: string = "";
    createdAt: Date = new Date();
}