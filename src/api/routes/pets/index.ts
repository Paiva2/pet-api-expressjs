import { Express } from "express"
import petCreation from "../../controllers/pet/petCreation.controller"
import petAdoptionContact from "../../controllers/pet/petAdoptionContact.controller"

export default function petRoutes(app: Express) {
  app.post("/new-pet", petCreation)
  app.post("/pet-contact", petAdoptionContact)
}
