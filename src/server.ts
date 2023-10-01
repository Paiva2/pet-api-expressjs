import app from "./app"
import envVariables from "./env/envVariables"

const server = app.listen(envVariables.PORT, () => {
  console.log(`⚡️ Server running at ${envVariables.PORT}`)
})

export default server
