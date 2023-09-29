import "dotenv/config";

const envVariables = {
  JWT_SECRET: process.env.JWT_SECRET,
  PORT: process.env.PORT,
};

export default envVariables;
