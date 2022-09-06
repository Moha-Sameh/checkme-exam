export interface Product {
  name: string;
  quantity: number;
  brands: Brand[];
}

export interface Result {
  id: string;
  area: string;
  name: string;
  quantity: string;
  brand: string;
}

type Brand = {
  name: string;
  popularity: number;
};
