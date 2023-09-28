import express, { Express } from "express";
import "dotenv/config";
import petRoutes from "./api/routes/pets";
import bodyParser from "body-parser";

const app: Express = express();

app.use(bodyParser.json());

petRoutes(app);

export default app;
