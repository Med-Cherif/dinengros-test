import calculateProductPrice from 'helpers/calculateProductPrice';
import { IOrderItem, IOrderProduct } from "./../interfaces/order.d";
import getOrderProducts from "./getOrderProducts";
import { getNetTax } from './getTaxPrice';

export default function calculateOrderTotal(order: IOrderItem) {
  const items = order.items;

  return items.reduce((acc, item) => {
    return acc + calculateProductPrice({
      price: item.price,
      qty: item.qty,
      tax: item.product?.taxes[0]?.percentage || 0
    })
  }, 0)
}


export const calculateOrderTaxes = (order: IOrderItem) => {
  const items = order.items;

  return items.reduce((acc, item) => {
    return acc + getNetTax(item.price, item.product?.taxes[0]?.percentage || 0) * item.qty
  }, 0)
}