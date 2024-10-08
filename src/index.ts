import { AppDataSource } from "./data-source";
import express from "express";
import * as dotenv from "dotenv";
import { Request, Response } from "express";
import { minionsRouter, ideasRouter, meetingsRouter, } from "./routes/apiRoutes";
import "reflect-metadata";
import { errorHandler } from "./middlewares/error.middleware";
dotenv.config();

const app = express();
app.use(express.json());
const { PORT = 3000 } = process.env;
app.use("/api/minions", minionsRouter);
app.use("/api/ideas", ideasRouter);
app.use("/api/meetings", meetingsRouter)

app.get("*", (req: Request, res: Response) => {
    res.status(505).json({ message: "Bad Request" });
});
app.use("/", errorHandler);
AppDataSource.initialize()
    .then(async () => {
        app.listen(PORT, () => {
            console.log("Server is running on http://localhost:" + PORT);
        });
        console.log("Data Source has been initialized!");
    })
    .catch((error) => console.log(error));