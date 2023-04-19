export interface IProductCatalogue {
  id: number | string;
  name: string;
  price: number;
  img: string;
  description: string;
}

export interface ICatalogue {
  [pageNumber: string]: IProductCatalogue[];
}
