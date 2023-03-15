import { IProduct } from "interfaces/product";

export const getGroupProducts = (products: IProduct[], groupId: string | number) => {
    // if (!groupId) return products;
    // return products.filter(product => product.user_groups.includes(groupId));
    return products
}