export default function getTaxPrice(price: number, tax: number = 0) {
    const vat = price * tax / 100;
    return price + vat;
}

export const getNetTax = (price: number, tax: number = 0) => {
    const vat = price * tax / 100;
    return vat;
}