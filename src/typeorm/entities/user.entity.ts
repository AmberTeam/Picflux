import { Exclude } from "class-transformer";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({"name": "users"})
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    email: string;

    @Column({unique: true})
    username: string;

    @Column()
    password: string;

    @Column()
    isVerified: boolean = false;

    @Column()
    avatar: string = "";

    @Column({nullable: true})
    hashedRt: string;

    @Column()
    createdAt: Date = new Date();
}

export class SerializedUser {
    id: number;
    email: string;
    username: string;

    @Exclude()
    password: string;

    @Exclude()
    hashedRt: string;

    isVerified: boolean = false;
    avatar: string = "";
    createdAt: Date = new Date();
}