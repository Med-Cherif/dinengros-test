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

export interface IZoomPosition {
  x: number;
  y: number;
}

export interface IZoom {
  zoomed: boolean;
  zoomPosition: IZoomPosition;
}
