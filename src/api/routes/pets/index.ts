import { Express } from "express";
import petCreation from "../../controllers/pet/petCreation";

export default function petRoutes(app: Express) {
  app.post("/pet", petCreation);
}
