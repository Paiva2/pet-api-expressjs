import { Express } from "express"
import petCreation from "../../controllers/pet/petCreation.controller"

export default function petRoutes(app: Express) {
  app.post("/new-pet", petCreation)
}
