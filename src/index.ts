import axios from "axios";
import { config } from "dotenv";
import UserAgent from "user-agents";
import { Client } from "pg";
import { v4 as uuidv4 } from "uuid";
import { SingleBar } from "cli-progress";
import { Film } from "./Film";

config();

function convertToFilms(apiFilms: Film[]): Film[] {
  if (!Array.isArray(apiFilms)) {
    apiFilms = [apiFilms];
  }
  return apiFilms.map((apiMovie: Film) => {
    const movie: Film = {
      uuid: uuidv4(),
      kpId: apiMovie.kpId,
      externalKpHD: (apiMovie.externalId && apiMovie.externalId["KpHD"]) || "",
      externalImdb: (apiMovie.externalId && apiMovie.externalId["imdb"]) || "",
      externalTmdb: (apiMovie.externalId && apiMovie.externalId["tmdb"]) || "",

      ratingKp:
        apiMovie.rating && !Number.isNaN(parseFloat(apiMovie.rating["kp"]))
          ? parseFloat(apiMovie.rating["kp"])
          : 0,
      ratingImdb:
        apiMovie.rating && !Number.isNaN(parseFloat(apiMovie.rating["imdb"]))
          ? parseFloat(apiMovie.rating["imdb"])
          : 0,
      ratingFilmCritics:
        apiMovie.rating &&
        !Number.isNaN(parseFloat(apiMovie.rating["filmsCritics"]))
          ? parseFloat(apiMovie.rating["filmsCritics"])
          : 0,
      ratingRussianFilmCritics:
        apiMovie.rating &&
        !Number.isNaN(parseFloat(apiMovie.rating["russianFilmCritics"]))
          ? parseFloat(apiMovie.rating["russianFilmCritics"])
          : 0,

      votesKp:
        apiMovie.votes && !Number.isNaN(parseFloat(apiMovie.votes["kp"]))
          ? parseFloat(apiMovie.votes["kp"])
          : 0,
      votesImdb:
        apiMovie.votes && !Number.isNaN(parseFloat(apiMovie.votes["imdb"]))
          ? parseFloat(apiMovie.votes["imdb"])
          : 0,
      votesFilmCritics:
        apiMovie.votes &&
        !Number.isNaN(parseFloat(apiMovie.votes["filmsCritics"]))
          ? parseFloat(apiMovie.votes["filmsCritics"])
          : 0,
      votesRussianFilmCritics:
        apiMovie.votes &&
        !Number.isNaN(parseFloat(apiMovie.votes["russianFilmCritics"]))
          ? parseFloat(apiMovie.votes["russianFilmCritics"])
          : 0,

      enImdbPoster: "",
      uaImdbPoster: "",
      ruImdbPoster: "",

      posterUrl: (apiMovie.poster && apiMovie.poster["url"]) || "",
      posterPreviewUrl:
        (apiMovie.poster && apiMovie.poster["previewUrl"]) || "",

      rating: apiMovie.rating || {},
      votes: apiMovie.votes || {},
      movieLength: apiMovie.movieLength || 0,
      type: apiMovie.type || "",
      name: apiMovie.name || "",
      description: apiMovie.description || "",
      year: apiMovie.year || 0,
      genres: apiMovie.genres || [],
      genresList:
        (apiMovie.genres && apiMovie.genres.map((genre) => genre.name)) ||
        [],
      countries: apiMovie.countries || [],
      countriesList:
        (apiMovie.countries &&
          apiMovie.countries.map((country) => country.name)) ||
        [],
      alternativeName: apiMovie.alternativeName || "",
      enName: apiMovie.enName || "",
      names: apiMovie.names || [],
      shortDescription: apiMovie.shortDescription || "",
      releaseYears: apiMovie.releaseYears || [
        {
          start: apiMovie.year || 0,
          end: apiMovie.year || 0,
        },
      ],
    };

    return movie;
  });
}

async function fetchFilms(page: number, limit: number): Promise<Film[]> {
  try {
    const userAgent = new UserAgent();
    const headers = {
      "X-API-KEY": process.env.TOKEN,
      "User-Agent": userAgent.toString(),
    };
    const response = await axios.get(
      `https://api.kinopoisk.dev/v1/movie?page=${page}&limit=${limit}`,
      { headers }
    );
    const filmsData: any[] = response.data.docs; // Assuming the array of films is under the "docs" property

    // Map the filmsData to Movie objects
    const films: Film[] = filmsData.map((movieData: any) => {
      const movie = new Film();
      movie.uuid = uuidv4();
      movie.externalId = movieData.externalId;
      movie.rating = movieData.rating;
      movie.votes = movieData.votes;
      movie.movieLength = movieData.movieLength;
      movie.kpId = movieData.id;
      movie.type = movieData.type;
      movie.name = movieData.name;
      movie.description = movieData.description;
      movie.year = movieData.year;
      movie.poster = movieData.poster;
      movie.genres = movieData.genres;
      movie.countries = movieData.countries;
      movie.alternativeName = movieData.alternativeName;
      movie.enName = movieData.enName;
      movie.names = movieData.names;
      movie.shortDescription = movieData.shortDescription;

      return movie;
    });

    return films;
  } catch (error) {
    console.error("Error fetching films:", error);
    return [];
  }
}

async function createFilmsTable(): Promise<void> {
  try {
    const client = new Client({
      host: process.env.HOST,
      port: parseInt(process.env.PORT!.toString()),
      database: process.env.DATABASE,
      user: process.env.USER,
      password: process.env.PASSWORD,
    });
    await client.connect();

    const query = `
      CREATE TABLE IF NOT EXISTS films (
        uuid UUID DEFAULT uuid_generate_v4(),
        kpId  INTEGER,
        externalKpHD VARCHAR(255),
        externalImdb VARCHAR(255),
        externalTmdb VARCHAR(255),
        ratingKp FLOAT,
        ratingImdb FLOAT,
        ratingFilmCritics FLOAT,
        ratingRussianFilmCritics FLOAT,
        votesKp INT,
        votesImdb INT,
        votesFilmCritics INT,
        votesRussianFilmCritics INT,
        enImdbPoster VARCHAR(255),
        uaImdbPoster VARCHAR(255),
        ruImdbPoster VARCHAR(255),
        posterUrl VARCHAR(255),
        posterPreviewUrl VARCHAR(255),
        externalId JSONB,
        rating JSONB,
        votes JSONB,
        movieLength INT,
        type VARCHAR(255),
        name VARCHAR(255),
        description TEXT,
        year INT,
        poster JSONB,
        genres JSONB,
        genresList TEXT[],
        countries JSONB,
        countriesList TEXT[],
        alternativeName VARCHAR(255),
        enName VARCHAR(255),
        names JSONB,
        shortDescription TEXT,
        releaseYears JSONB
      );
    `;

    await client.query(query);

    console.log("films table created successfully");

    await client.end();
  } catch (error) {
    console.error("Error creating films table:", error);
    throw error;
  }
}

async function addFilmsToDatabase(films: Film[]): Promise<void> {
  try {
    const client = new Client({
      host: process.env.HOST,
      port: parseInt(process.env.PORT!.toString()),
      database: process.env.DATABASE,
      user: process.env.USER,
      password: process.env.PASSWORD,
    });
    await client.connect();

    // Prepare the data to be inserted into the database
    const movieData = films.map((movie) => [
      movie.uuid ?? uuidv4(),
      movie.externalKpHD ?? "",
      movie.externalImdb ?? "",
      movie.externalTmdb ?? "",
      movie.ratingKp ?? 0,
      movie.ratingImdb ?? 0,
      movie.ratingFilmCritics ?? 0,
      movie.ratingRussianFilmCritics ?? 0,
      movie.votesKp ?? 0,
      movie.votesImdb ?? 0,
      movie.votesFilmCritics ?? 0,
      movie.votesRussianFilmCritics ?? 0,
      movie.enImdbPoster ?? "",
      movie.uaImdbPoster ?? "",
      movie.ruImdbPoster ?? "",
      movie.posterUrl ?? "",
      movie.posterPreviewUrl ?? "",
      JSON.stringify(movie.rating) || "{}",
      JSON.stringify(movie.votes) || "{}",
      movie.movieLength ?? 0,
      movie.kpId ?? 0,
      movie.type ?? "",
      movie.name ?? "",
      movie.description ?? "",
      movie.year ?? 0,
      JSON.stringify(movie.genres) || "[]",
      movie.genresList,
      JSON.stringify(movie.countries) || "[]",
      movie.countriesList,
      movie.alternativeName ?? "",
      movie.enName ?? "",
      JSON.stringify(movie.names) || "[]",
      movie.shortDescription ?? "",
      JSON.stringify(movie.releaseYears) || "[]",
    ]);

    const query = `
  INSERT INTO films (
    uuid,
    externalKpHD,
    externalImdb,
    externalTmdb,
    ratingKp,
    ratingImdb,
    ratingFilmCritics,
    ratingRussianFilmCritics,
    votesKp,
    votesImdb,
    votesFilmCritics,
    votesRussianFilmCritics,
    enImdbPoster,
    uaImdbPoster,
    ruImdbPoster,
    posterUrl,
    posterPreviewUrl,
    rating,
    votes,
    movieLength,
    kpId,
    type,
    name,
    description,
    year,
    genres,
    genresList,
    countries,
    countriesList,
    alternativeName,
    enName,
    names,
    shortDescription,
    releaseYears
  )
  VALUES
    ${movieData
      .map(
        (_, index) =>
          `(${movieData[index]
            .map((_, i) => `$${index * movieData[0].length + i + 1}`)
            .join(", ")})`
      )
      .join(", ")};
`;

    await client.query(query, movieData.flat());

    await client.end();
  } catch (error: any) {
    if (error.code === "23505") {
      console.log("Duplicate movie entry detected.");
    } else {
      console.error("Error adding films to the database:", error);
      throw error;
    }
  }
}

async function processFilms(): Promise<void> {
  const totalPageCount = 20;
  const filmsPerPage = 250;

  const progressBar = new SingleBar({
    format: "Progress [{bar}] {percentage}% | ETA: {eta}s | {value}/{total}",
    barCompleteChar: "\u2588",
    barIncompleteChar: "\u2591",
    hideCursor: true,
  });

  try {
    progressBar.start(totalPageCount, 0);

    for (let page = 1; page <= totalPageCount; page++) {
      const films = convertToFilms(await fetchFilms(page, filmsPerPage));

      if (films.length > 0) {
        await addFilmsToDatabase(films);
      }

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

async function start(): Promise<void> {
  try {
    await createFilmsTable();
    await processFilms();
  } catch (error: any) {
    if (error.code === "23505") {
      console.log("Duplicate movie entry detected.");
    }
    console.error("Error starting the program:", error);
    process.exit(1);
  }
}

start();
