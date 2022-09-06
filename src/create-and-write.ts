import { join } from "path";
import productSpecsHelper from "./product-specs.helper";
import { Result } from "./types";
import fs from "fs";

export default async function (originalName: string, data: Result[]) {
  const products = productSpecsHelper(data);

  const csvProductContent = products
    .map((product) =>
      [product.name, (product.quantity / data.length).toFixed(1)].join(",")
    )
    .join("\n");

  const csvBrandContent = products
    .map((product) => {
      const currentHighestPopularity = Math.max(
        ...product.brands.map((brand) => brand.popularity)
      );
      const currentMostPopularBrand = product.brands.find(
        (brand) => brand.popularity === currentHighestPopularity
      );

      return [product.name, currentMostPopularBrand?.name].join(",");
    })
    .join("\n");

  const created = await new Promise((resolve) => {
    const writeStreamZero = fs.createWriteStream(
      join(__dirname, "public", "downloads", `0_${originalName}`)
    );

    const writeStreamOne = fs.createWriteStream(
      join(__dirname, "public", "downloads", `1_${originalName}`)
    );

    writeStreamOne.write(csvBrandContent);
    writeStreamZero.write(csvProductContent);
    resolve({ success: true });
  });

  return created;
}
