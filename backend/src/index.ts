import express from "express";
import cors from "cors";
require("dotenv").config();

// <<<<<<< OWN IMPORTS >>>>>>>>>>> //
import registerAllRoutes from "./routes";
import connectDB from "./config/conndect-db";
import limiter from "./config/rateLimit";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);

app.use(cors());
registerAllRoutes(app);

app.use(limiter);

const startApp = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log("App started");
  });
};

startApp();
