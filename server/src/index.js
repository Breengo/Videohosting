import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import jwt from "jsonwebtoken";
import { fileURLToPath } from "url";

import router from "./routes/index.js";
import sequilize from "./db.js";
import model from "./models/models.js";
import errorHandler from "./middlewares/ErrorHandlingMiddleware.js";
import fileUpload from "express-fileupload";

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const models = model;
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(fileUpload({}));
app.use(express.static(path.resolve(__dirname, "static")));
app.use(router);
app.use(errorHandler);

const start = async () => {
  try {
    await sequilize.authenticate();
    await sequilize.sync();
    app.listen(port, () => {
      console.log(`Server started on port:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
