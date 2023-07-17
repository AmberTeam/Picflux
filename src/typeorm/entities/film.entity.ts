import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Rating } from './rating.entity';
import { Comment } from './comment.entity';
import { v4 as uuidv4 } from 'uuid';

@Entity({ name: 'films' })
export class Film {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuidv4();

  @Column({ name: 'kpid', unique: true })
  kpId: number;

  @OneToMany(() => Rating, (rating) => rating.owner)
  @JoinColumn()
  ratings: Rating[];

  @OneToMany(() => Comment, (comment) => comment.owner)
  @JoinColumn()
  comments: Comment[];
}

export class SerializedFilm {
  id: number;
  externalId: Record<string, string>;
  rating: Record<string, string>;
  votes: Record<string, string>;

  posterUrl: string;

  movieLength: number;
  type: string;
  name: string;
  description: string;

  genresList: string[];

  countriesList: string[];
  alternativeName: string;
  shortDescription: string;
  releaseYears: any;
  averageRating: number;
}

export class SerializedPaginationFilm {
  uuid: string;
  rating: Record<string, string>;

  posterUrl: string;

  movieLength: number;
  type: string;
  name: string;

  genresList: string[];

  countriesList: string[];
  alternativeName: string;
  shortDescription: string;
  releaseYears: any;
  averageRating: number;
}

