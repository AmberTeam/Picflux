import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { User } from './user.entity';
import { Film } from "./film.entity";

@Entity({ name: "comments" })
export class Comment {
  @PrimaryGeneratedColumn("uuid")
  id: string = uuidv4();

  @ManyToOne(() => Film, (film) => film.ratings)
  @JoinColumn()
  film?: Film;

  @ManyToOne(() => User, (user) => user)
  @JoinColumn()
  owner?: User;

  @Column()
  text: string;

  @Column({ nullable: true })
  commentId: string;

  @OneToMany(() => Comment, (comment) => comment.commentId)
  @JoinColumn()
  comments: Comment[];

  @Column()
  createdAt: Date = new Date();
}
