import { IProduct } from 'interfaces/product';
export interface IAddCartItem {
        "product_id": number,
        "product_unit_id": number,
        "qty": number,
        "price" : number,
        "tax" : number | null
}

export interface ICartItem {
        id: number
        product: IProduct
        unit: {
                "id": number,
                "name": string,
        }
        price:number
        qty: number
        tax: number
}