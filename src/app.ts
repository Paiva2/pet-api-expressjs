import express, { Express, Request, Response } from "express";
import "dotenv/config";

const app: Express = express();

app.get("/test", (req: Request, res: Response) => {
  res.send("Hello world!");
});

export default app;
