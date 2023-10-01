import express, { Express } from "express"
import petRoutes from "./api/routes/pets"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import orgRoutes from "./api/routes/org"

const app: Express = express()

app.use(cookieParser())
app.use(bodyParser.json())

petRoutes(app)
orgRoutes(app)

export default app
