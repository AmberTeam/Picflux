import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Rating } from './rating.entity';
import { Exclude } from 'class-transformer';

@Entity({ name: 'films' })
export class Film {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({name: 'kpid'})
  kpId: number;

  @Column({ name: 'externalkphd', length: 255, nullable: true })
  externalKpHD: string;

  @Column({ name: 'externalimdb', length: 255, nullable: true })
  externalImdb: string;

  @Column({ name: 'externaltmdb', length: 255, nullable: true })
  externalTmdb: string;

  @Column({ name: 'ratingkp', type: 'float', nullable: true })
  ratingKp: number;

  @Column({ name: 'ratingimdb', type: 'float', nullable: true })
  ratingImdb: number;

  @Column({ name: 'ratingfilmcritics', type: 'float', nullable: true })
  ratingFilmCritics: number;

  @Column({ name: 'ratingrussianfilmcritics', type: 'float', nullable: true })
  ratingRussianFilmCritics: number;

  @Column({ name: 'voteskp', type: 'int', nullable: true })
  votesKp: number;

  @Column({ name: 'votesimdb', type: 'int', nullable: true })
  votesImdb: number;

  @Column({ name: 'votesfilmcritics', type: 'int', nullable: true })
  votesFilmCritics: number;

  @Column({ name: 'votesrussianfilmcritics', type: 'int', nullable: true })
  votesRussianFilmCritics: number;

  @Column({ name: 'enimdbposter', length: 255, nullable: true })
  enImdbPoster: string;

  @Column({ name: 'uaimdbposter', length: 255, nullable: true })
  uaImdbPoster: string;

  @Column({ name: 'ruimdbposter', length: 255, nullable: true })
  ruImdbPoster: string;

  @Column({ name: 'posterurl', length: 255, nullable: true })
  posterUrl: string;

  @Column({ name: 'posterpreviewurl', length: 255, nullable: true })
  posterPreviewUrl: string;

  @Column({ type: 'jsonb', nullable: true })
  externalId: any;

  @Column({ type: 'jsonb', nullable: true })
  rating: any;

  @Column({ type: 'jsonb', nullable: true })
  votes: any;

  @Column({ name: 'movielength', type: 'int', nullable: true })
  movieLength: number;

  @Column({ length: 255, nullable: true })
  type: string;

  @Column({ length: 255, nullable: true })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'int', nullable: true })
  year: number;

  @Column({ type: 'jsonb', nullable: true })
  poster: any;

  @Column({ type: 'jsonb', nullable: true })
  genres: any;

  @Column({ name: 'genreslist', type: 'text', array: true, nullable: true })
  genresList: string[];

  @Column({ type: 'jsonb', nullable: true })
  countries: any;

  @Column({ name: 'countrieslist', type: 'text', array: true, nullable: true })
  countriesList: string[];

  @Column({ name: 'alternativename', length: 255, nullable: true })
  alternativeName: string;

  @Column({ name: 'enname', length: 255, nullable: true })
  enName: string;

  @Column({ type: 'jsonb', nullable: true })
  names: any;

  @Column({ name: 'shortdescription', type: 'text', nullable: true })
  shortDescription: string;

  @Column({ name: 'releaseyears', type: 'jsonb', nullable: true })
  releaseYears: any;

  @Column({ default: 0 })
  averageRating: number;

  @OneToMany(() => Rating, (rating) => rating.owner)
  @JoinColumn()
  ratings: Rating[];
}

export class SerializedFilm {
  uuid: string;
  externalKpHD: string;
  externalImdb: string;
  externalTmdb: string;
  ratingKp: number;
  ratingImdb: number;
  ratingFilmCritics: number;
  ratingRussianFilmCritics: number;
  votesKp: number;
  votesImdb: number;
  votesFilmCritics: number;
  votesRussianFilmCritics: number;

  @Exclude()
  enImdbPoster: string;

  @Exclude()
  uaImdbPoster: string;

  @Exclude()
  ruImdbPoster: string;

  posterUrl: string;

  @Exclude()
  posterPreviewUrl: string;

  @Exclude()
  externalId: any;

  @Exclude()
  rating: any;

  @Exclude()
  votes: any;

  movieLength: number;
  type: string;
  name: string;
  description: string;
  year: number;

  @Exclude()
  poster: any;

  @Exclude()
  genres: any;

  genresList: string[];

  @Exclude()
  countries: any;

  countriesList: string[];
  alternativeName: string;
  enName: string;
  names: any;
  shortDescription: string;
  releaseYears: any;
  averageRating: number;

  @Exclude()
  ratings: Rating[];
}
