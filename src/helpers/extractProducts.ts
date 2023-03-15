import { ICategory } from "interfaces/category";
import { IProduct } from "interfaces/product";

export const extractProducts = (category: ICategory) => {
    if (category.children.length)  return [
            ...category.products,
            ...category.children.reduce((nestedProducts, childCategory: ICategory) => {
                  if (childCategory.children.length) return [...nestedProducts, ...extractProducts(childCategory).filter(product => {
                    return !category.products.some(prod => prod.id === product.id) && !nestedProducts.some(prod => prod.id === product.id)
                  })];
                  return [...nestedProducts, ...childCategory.products.filter(product => {
                    return !category.products.some(prod => prod.id === product.id) && !nestedProducts.some(prod => prod.id === product.id)
                  })]
            }, [] as IProduct[])
        ]
    return category.products
}