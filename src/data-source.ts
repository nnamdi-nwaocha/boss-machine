import "reflect-metadata";
import { DataSource } from "typeorm";

import * as dotenv from "dotenv";
import { Minion } from "./entities/minions.entity";
import { Work } from "./entities/work.entity";
import { Meeting } from "./entities/meetings.entity";
import { Idea } from "./entities/ideas.entity";

dotenv.config();

const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE, NODE_ENV } =
    process.env;

export const AppDataSource = new DataSource({
    type: "postgres",
    host: DB_HOST,
    port: parseInt(DB_PORT || "5432"),
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,

    synchronize: true,
    //logging logs sql command on the terminal
    logging: NODE_ENV === "dev" ? true : false,
    entities: [Minion, Work, Meeting, Idea],
    migrations: [__dirname + "/migration/*.ts"],
    subscribers: [],
});