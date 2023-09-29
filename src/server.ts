import app from "./app";
import envVariables from "./env/envVariables";

app.listen(envVariables.PORT, () => {
  console.log(`⚡️ Server running at http://localhost:3000`);
});
