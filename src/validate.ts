import { NextFunction, Request, Response } from "express";

export default function (req: Request, res: Response, next: NextFunction) {
  const { file } = req;

  if (!file) {
    return res.status(400).send({
      status: 400,
      message: "File field is required",
    });
  }

  const whitelist = ["csv", "text/csv"];
  const allowed_file_size = 10e4;
  const file_extension = file.originalname.slice(
    ((file.originalname.lastIndexOf(".") - 1) >>> 0) + 2
  );

  if (
    !whitelist.includes(file_extension) ||
    !whitelist.includes(file.mimetype)
  ) {
    return res.status(400).send({
      status: 400,
      message: "Allowed file type is csv",
    });
  }

  if (file.size / (1024 * 1024) > allowed_file_size) {
    return res.status(400).send({
      status: 400,
      message: "Allowed File size is 10MB",
    });
  }

  return next();
}
