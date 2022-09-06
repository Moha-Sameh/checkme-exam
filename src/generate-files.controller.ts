import { Request, Response } from "express";
import convertToJson from "./convert-to-json";

export default async function (req: Request, res: Response) {
  const { file } = req;
  if (!file) return res.status(400).send({ message: "File" });
  const created = await convertToJson(file);

  if (created.success == false) {
    return res.status(400).send(created);
  }

  return res.status(200).send(created);
}
