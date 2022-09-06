import { Product, Result } from "./types";

export default function (data: Result[]) {
  let products: Product[] = [];
  data.forEach((element: Result) => {
    const product = products.find((product) => product.name === element.name);
    if (!product) {
      products.push({
        name: element.name,
        quantity: parseInt(element.quantity),
        brands: [
          {
            name: element.brand,
            popularity: 1,
          },
        ],
      });
      return;
    }
    const brand = product?.brands.find((brand) => brand.name === element.brand);

    product.quantity += parseInt(element.quantity);

    if (!brand) {
      product?.brands.push({
        name: element.brand,
        popularity: 1,
      });
      return;
    }

    brand.popularity += 1;
  });

  return products;
}
