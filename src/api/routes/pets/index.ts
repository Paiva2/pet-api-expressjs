import { Express } from "express"
import petCreation from "../../controllers/pet/petCreation.controller"
import petAdoptionContact from "../../controllers/pet/petAdoptionContact.controller"
import petListForAdoptionInACity from "../../controllers/pet/petListForAdoptionInACity.controller"
import petListByCaracteristics from "../../controllers/pet/petListByCaracteristics.controller"

export default function petRoutes(app: Express) {
  app.post("/new-pet", petCreation)
  app.post("/pet-contact", petAdoptionContact)

  app.get("/pets/:city/:state", petListForAdoptionInACity)

  app.get("/pets/:city", petListByCaracteristics)
}
