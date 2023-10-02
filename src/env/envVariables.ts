import "dotenv/config"

const envVariables = {
  JWT_SECRET: process.env.JWT_SECRET,
  PORT: process.env.NODE_ENV === "test" ? 0 : process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL,
}

export default envVariables
