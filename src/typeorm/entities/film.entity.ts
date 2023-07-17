import { JoinTable } from 'typeorm';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Person } from './person.entity';

@Entity({ name: 'films' })
export class Film {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ nullable: true })
  kpId: number;

  @Column({ nullable: true })
  status: string;

  @Column({ nullable: true })
  imdbId: string;

  @Column({ nullable: true })
  tmdbId: number;

  @Column('float', { nullable: true })
  imdbRating: number;

  @Column({ nullable: true })
  imdbVotes: number;

  @Column({ nullable: true })
  backdropUrl: string;

  @Column({ nullable: true })
  movieLength: number;

  @Column({ nullable: true })
  type: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  slogan: string;

  @Column({ nullable: true })
  budgetValue: number;

  @Column({ nullable: true })
  budgetCurrency: string;

  @Column({ nullable: true })
  posterUrl: string;

  @Column({ type: 'simple-json', nullable: true })
  genres: { name: string }[];

  @Column({ type: 'simple-json', nullable: true })
  countries: { name: string }[];

  @Column({ type: 'simple-json', nullable: true })
  videos: { trailers: { url: string; name: string; site: string; type: string }[] };

  @ManyToMany(() => Person)
  @JoinTable({ name: 'film_persons'})
  persons: Person[];

  @Column({ type: 'simple-json', nullable: true })
  alternativeName: string;

  @Column({ nullable: true })
  enName: string;

  @Column({ type: 'simple-json', nullable: true })
  names: { name: string; language?: string }[];

  @Column({ type: 'simple-json', nullable: true })
  audience: { count: number; country: string }[];

  @Column({ nullable: true })
  ratingMpaa: string;

  @Column({ nullable: true })
  shortDescription: string;

  @Column({ nullable: true })
  ageRating: number;

  @Column({ type: 'simple-json', nullable: true })
  seasonsInfo: any[];

  @Column({ type: 'simple-json', nullable: true })
  sequelsAndPrequels: any[];

  @Column({ nullable: true })
  seriesLength: number;

  @Column({ nullable: true })
  totalSeriesLength: number;
}
