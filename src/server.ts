import app from "./app"
import "dotenv/config"
import envVariables from "./env/envVariables"

const server = app.listen(envVariables.PORT, () => {
  console.log(
    process.env.NODE_ENV === "test"
      ? "🤖 Server running for tests"
      : `⚡️ Server running at ${envVariables.PORT}`
  )
})

export default server
