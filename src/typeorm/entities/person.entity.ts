import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn, JoinTable } from 'typeorm';
import { Film } from "./film.entity";

@Entity({ name: "persons" })
export class Person {
  @PrimaryGeneratedColumn("uuid")
  uuid: string;

  @Column({ nullable: true })
  kpId: number;

  @Column({nullable: true})
  photo: string;

  @Column({nullable: true})
  name: string;

  @Column({ nullable: true })
  enName: string;

  @ManyToMany(() => Film, (film) => film.persons)
  @JoinTable({name: "person_films"})
  films: Film[];
}
