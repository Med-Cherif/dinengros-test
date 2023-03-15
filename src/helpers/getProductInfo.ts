import { IProduct } from "interfaces/product";

export const getProductInfo = ({
    product, 
    unit, 
    groupId,  
    personalDiscounts, 
    offer_id
}: {
    product: IProduct,
    unit: number,
    groupId: number,
    personalDiscounts?: any[],
    offer_id?: number
}) => {

    let productPrice: number = 0;
    let totalStock: number = 0;

    let discountedPrice: number = 0;
    let offerPercentage: number = 0;
    let personalDiscount: boolean = false;

    // extract price based on the user group, else get the standard price
    
    const productUnit = product?.unit_prices?.find(ut => ut.unit_id === unit)
    const price = productUnit?.groups_prices?.find(grp => (grp.user_group_id === groupId) || (grp.user_group_id === 1) || grp.price)?.price;
    productPrice = price;

    // get the total stock Stock
    
    const stock = +product?.total_qty;
    totalStock = stock

    // extract price offer

    // if the product has a personal discounts, return the discount

    const hasPersonalDiscount = personalDiscounts?.find(discount => discount.product.id === product.id);

    if (!offer_id && hasPersonalDiscount) {
        const priceOffer = hasPersonalDiscount.units.find(ut => ut.unit_id === unit)?.price;
        discountedPrice = priceOffer;
        personalDiscount = true

    // else check if the product has a normal discount

    } else {
        const priceOffer = product?.shopoffers.find((offer, index) => (offer.shop_offer_id === offer_id) || (index === 0))?.units?.find(ut => 
            ut?.unit_id === unit
        );
        discountedPrice = priceOffer?.price
    }

    // get the offer percentage if the discount exsists

    if (discountedPrice && productPrice) {
        offerPercentage = 100 - (discountedPrice * 100) / productPrice;
    }

    // check if the discount is the same as the base price

    if (Math.ceil(productPrice) === Math.ceil(discountedPrice)) {
        discountedPrice = 0;
        offerPercentage = 0
        personalDiscount = false
    }

    return {productPrice, discountedPrice, offerPercentage, totalStock, personalDiscount}
    
}