import fs from "fs";
import * as csv from "csv";
import createAndWrite from "./create-and-write";

export default async function (
  file: Express.Multer.File
): Promise<{ success: boolean }> {
  const buffer = Buffer.from(file?.path).toString();

  const headers = ["id", "area", "name", "quantity", "brand"];
  const result = await new Promise((resolve, reject) => {
    let chunks: any = [];
    fs.createReadStream(buffer)
      .pipe(csv.parse())
      .on("data", function (row) {
        let obj: any = {};
        for (let i in headers) {
          obj[headers[i]] = row[i];
        }
        chunks.push(obj);
      })
      .on("error", () => {
        reject({ success: false });
      })
      .on("end", async () => {
        resolve(await createAndWrite(file.originalname, chunks));
      });
  });
  return result as { success: boolean };
}
