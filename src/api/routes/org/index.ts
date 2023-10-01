import { Express } from "express"
import orgRegister from "../../controllers/org/orgRegister.controller"
import orgAuthentication from "../../controllers/org/orgAuthentication.controller"

export default function orgRoutes(app: Express) {
  app.post("/register-org", orgRegister)

  app.post("/auth", orgAuthentication)
}
