import { IProduct, IProductUnit } from 'interfaces/product';
import { IDeliveryAddress } from './user.d';

export interface ICreateOrder {
    delivery_type_id: number;
    delivered_at: string
    address_facturation?: IDeliveryAddress
}

export interface IOrderProduct {
    qty: number
    price: number
    product: IProduct
    product_unit: IProductUnit
}

export interface IOrderMergedProduct {
    [id: string]: IOrderProduct
}

export interface IOrderItem {
    merged: number | boolean
    id: number
    status: string
    delivery_type: string
    delivered_at: string
    created_at: string
    address_facturation: IDeliveryAddress | null
    items: IOrderProduct[]
}