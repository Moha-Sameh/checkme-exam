import express from "express";
import validate from "./validate";
import { upload } from "./multer.middleware";
import generateFilesController from "./generate-files.controller";

const app = express();
app.use(express.json());

app.post(
  "/generate-files",
  upload.single("file"),
  validate,
  generateFilesController
);

app.listen(3000, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${3000}`);
});
