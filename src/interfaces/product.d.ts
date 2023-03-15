export interface IProduct {
    id: number | string,
    matricule: string | number,
    name: string,
    status: number | string,
    total_qty: number | string,
    total_weight: number | string,
    supplier_product_number: number | string,
    units: any[],
    taxes: any[]
    description: string,
    product_vars: [],
    unit_prices: [],
    price_offer?: [],
    has_exp_date: boolean,
    has_promo: boolean,
    no_codebar: boolean,
    no_price: boolean,
    no_category: boolean,
    created_at: string,
    updated_at: string,
    files?: [],
    user_groups: []
}

export interface IProductUnit {
    id: number
    name: string
}