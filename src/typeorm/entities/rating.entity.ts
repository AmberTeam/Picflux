import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { User } from './user.entity';
import { Film } from "./film.entity";

@Entity({"name": "ratings"})
export class Rating {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuidv4();


    @ManyToOne(() => Film, (film) => film)
    @JoinColumn()
    film?: Film;

    @ManyToOne(() => Film, (film) => film.ratings)
    @JoinColumn()
    owner?: User;

    @Column('integer')
    rating?: number;

    @Column()
    createdAt: Date = new Date();
}