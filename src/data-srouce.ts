import "reflect-metadata"
import { DataSource } from "typeorm"
import { config } from "dotenv";
import { Film } from "./typeorm/entities/film.entity";
import { Person } from "./typeorm/entities/person.entity";

config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.HOST,
    port: parseInt(process.env.PORT!),
    username: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    synchronize: true,
    logging: false,
    entities: [Film, Person],
    migrations: [],
    subscribers: [],
})