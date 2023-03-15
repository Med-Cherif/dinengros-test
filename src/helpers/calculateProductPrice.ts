import getTaxPrice from "./getTaxPrice"

interface IArgument {
    price: number
    tax: number
    qty: number
}

export default function calculateProductPrice({ price, qty, tax }: IArgument) {
    const taxPrice = getTaxPrice(price, tax);
    return taxPrice * qty;
}

