import { Express } from "express"
import orgRegister from "../../controllers/org/orgRegister.controller"

export default function orgRoutes(app: Express) {
  app.post("/register-org", orgRegister)
}
