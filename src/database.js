/* Modules */
import mongoose from "mongoose";

mongoose
  .connect("mongodb://localhost/jwt_practice", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(console.log("Database is connected"));
