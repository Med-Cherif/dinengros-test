import { IProduct } from "./product"

export interface ICategory {
    id: string | number,
    name: string,
    status: number | string,
    icon_class: string
    label: string,
    parent_id: number | string,
    products?: IProduct[],
    children?: ICategory[],
    image: string
}