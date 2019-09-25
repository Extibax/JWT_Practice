/* Modules */
import express from "express";

/* Import Controllers */
import auth_controller from "./controllers/auth_controller";

/* Init Express */
const app = express();

/* App Config */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(auth_controller);

/* App Export */
export default app;
