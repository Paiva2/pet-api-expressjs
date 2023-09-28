import { Express } from "express";
import create from "../../controllers/pet/create";

export default function petRoutes(app: Express) {
  app.post("/pet", create);
}
