import { ICatalogue, IProductCatalogue } from "interfaces/catalogue";

export default function handleProductsCatalogue(
  products: IProductCatalogue[],
  by: number = 12
) {
  const catalogue = {};
  let firstPage = 0;
  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    if (i % by === 0) {
      firstPage++;
      catalogue[`page-${firstPage}`] = [product];
    } else {
      catalogue[`page-${firstPage}`] = [
        ...catalogue[`page-${firstPage}`],
        product,
      ];
    }
  }
  return catalogue;
}

export const sliceCatalogue = (catalogue: ICatalogue) => {
  const list = [];

  const catalogueValues = Object.values(catalogue);
  for (let i = 0; i < catalogueValues.length; i += 2) {
    list.push({
      list1: catalogueValues[i] || [],
      list2: catalogueValues[i + 1] || [],
    });
  }
  return list;
};
