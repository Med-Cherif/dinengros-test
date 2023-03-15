import { IProduct } from "interfaces/product";

export const getProductPrice = (product: IProduct, unit: number, user: any | number) => {
    let productPrice = 0;
    let discountedPrice = 0;
    // if (typeof user === 'number') {
    //     const price = product?.unit_prices?.find(ut => ut.unit_id === unit).groups_prices.find(grp => grp.user_group_id === user).price;
    //     productPrice = price;
    // } else {
    //     const price = product?.unit_prices?.find(ut => ut.unit_id === unit).groups_prices.find(grp => grp.user_group_id === user.profile.user_group.id).price;
    //     productPrice = price;
    // }

    return {productPrice, discountedPrice}
    
}