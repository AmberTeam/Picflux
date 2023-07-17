import { config } from "dotenv";
import { Film } from "./typeorm/entities/film.entity";
import { AppDataSource } from "./data-srouce";
import axios from "axios";
import { Person } from "./typeorm/entities/person.entity";
import { stringify, v4 as uuidv4 } from "uuid";
import { SingleBar } from "cli-progress";

config();

async function parseAndSaveFilms(response: any) {
  try {
    const films = response.docs;

    // Create a new TypeORM query runner
    const queryRunner = AppDataSource.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Iterate over the films and save them to the database
      for (const filmData of films) {
        const film = new Film();
        film.uuid = uuidv4();
        film.kpId = filmData.id;
        film.status = filmData.status;
        film.imdbId = filmData.externalId?.imdb;
        film.tmdbId = filmData.externalId?.tmdb;
        film.imdbRating = filmData.rating?.imdb;
        film.imdbVotes = filmData.votes?.imdb;
        film.backdropUrl = filmData.backdrop?.url;
        film.movieLength = filmData.movieLength;
        film.type = filmData.type;
        film.name = filmData.name;
        film.description = filmData.description;
        film.slogan = filmData.slogan;
        film.budgetValue = filmData.budget?.value;
        film.budgetCurrency = filmData.budget?.currency;
        film.posterUrl = filmData.poster?.url;
        film.genres = filmData.genres;
        film.countries = filmData.countries;
        film.videos = filmData.videos;
        film.alternativeName = filmData.alternativeName;
        film.enName = filmData.enName;
        film.names = filmData.names;
        film.audience = filmData.audience;
        film.ratingMpaa = filmData.ratingMpaa;
        film.shortDescription = filmData.shortDescription;
        film.ageRating = filmData.ageRating;
        film.seasonsInfo = filmData.seasonsInfo;
        film.sequelsAndPrequels = filmData.sequelsAndPrequels;
        film.seriesLength = filmData.seriesLength;
        film.totalSeriesLength = filmData.totalSeriesLength;

        const personsData = filmData.persons;
        const persons: Person[] = [];

        for (const personData of personsData) {
          const person = new Person();

          person.uuid = uuidv4();
          person.kpId = personData.id;
          person.photo = personData.photo;
          person.name = personData.name;
          person.enName = personData.enName;

          persons.push(person);
        }
        await queryRunner.manager.save(Film, film);

        // Update the persons with the associated films
        for (const person of persons) {
          person.films = [film];
          await queryRunner.manager.save(Person, person);
        }
      }

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  } catch (error) {
    console.error("Error saving films:", error);
  }
}

async function processFilms(
  token: string,
  pages: number,
  limit: number
): Promise<void> {
  const progressBar = new SingleBar({
    format: "Progress [{bar}] {percentage}% | ETA: {eta}s | {value}/{total}",
    barCompleteChar: "\u2588",
    barIncompleteChar: "\u2591",
    hideCursor: true,
  });

  try {
    progressBar.start(pages, 0);

    for (let page = 1; page <= pages; page++) {
      const headers = {
        "x-api-key": token,
      };
      const response = await axios.get(
        `https://api.kinopoisk.dev/v1.3/movie?selectFields=ageRating&selectFields=externalId.imdb&selectFields=externalId.tmdb&selectFields=id&selectFields=name&selectFields=alternativeName&selectFields=enName&selectFields=names.name&selectFields=names.language&selectFields=type&selectFields=description&selectFields=shortDescription&selectFields=slogan&selectFields=status&selectFields=rating.imdb&selectFields=votes.imdb&selectFields=movieLength&selectFields=ratingMpaa&selectFields=backdrop.url&selectFields=poster.url&selectFields=videos.trailers.url&selectFields=videos.trailers.name&selectFields=videos.trailers.site&selectFields=videos.trailers.type&selectFields=audience.country&selectFields=audience.count&selectFields=seriesLength&selectFields=totalSeriesLength&selectFields=releaseYears.start&selectFields=releaseYears.end&selectFields=sequelsAndPrequels.id&selectFields=budget.value&selectFields=budget.currency&selectFields=seasonsInfo.number&selectFields=seasonsInfo.episodesCount&selectFields=persons.name&selectFields=persons.enName&selectFields=persons.photo&selectFields=persons.id&selectFields=countries.name&selectFields=genres.name&page=${page}&limit=${limit}`,
        { headers }
      );
      parseAndSaveFilms(response.data);

      progressBar.update(page);
    }

    progressBar.stop();
    console.log("All films fetched and processed.");
    process.exit(0);
  } catch (error: any) {
    if (error.code === "23505") {
      console.log("Duplicate movie entry detected.");
    } else {
      progressBar.stop();
      console.error("Error:", error);
      process.exit(1);
    }
  }
}

const main = async () => {
  await AppDataSource.initialize();
  const tokens = process.env.TOKENS?.split(",")!;

  tokens.forEach((tokenInfo) => {
    const token = tokenInfo.split(":")[0]!;
    const pages = parseInt(tokenInfo.split(":")[1]!);
    const limit = parseInt(tokenInfo.split(":")[2]!);

    processFilms(token, pages, limit);
  });
};
main();
