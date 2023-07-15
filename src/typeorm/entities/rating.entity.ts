import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { User } from './user.entity';
import { Film } from "./film.entity";

@Entity({"name": "ratings"})
export class Rating {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuidv4();

    @ManyToOne(() => Film, (film) => film.ratings)
    @JoinColumn()
    film?: Film;

    @ManyToOne(() => User, (user) => user)
    @JoinColumn()
    owner?: User;

    @Column()
    rating?: number;

    @Column()
    createdAt: Date = new Date();
}