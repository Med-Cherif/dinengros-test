import { IFilePath } from "./file";

export interface IProductCatalogue {
  id: number | string;
  product: string;
  price: number;
  img: string;
  description: string;
}

export interface ICatalogue {
  [pageNumber: string]: IProductCatalogue[];
}

export interface ICatalogueResponse {
  firstImage: IFilePath | null;
  lastImage: IFilePath | null;
}

export interface IZoomPosition {
  x: number;
  y: number;
}

export interface IZoom {
  zoomed: boolean;
  zoomPosition: IZoomPosition;
}
