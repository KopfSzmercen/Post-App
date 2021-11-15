import { Express } from "express";
import router from "./routes";

const registerAllRoutes = (app: Express) => {
  app.use(router);
};

export default registerAllRoutes;
