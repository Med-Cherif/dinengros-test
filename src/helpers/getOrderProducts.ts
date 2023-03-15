import { IOrderItem, IOrderProduct } from "./../interfaces/order.d";
export default function getOrderProducts(order: IOrderItem) {
  // console.log(order)
  let list: IOrderProduct[] = [];
  if (order?.merged === 1 || order?.merged === true) {
    Object.values(order.items).forEach((items) => {
      items.forEach((item) => {
        list.push(item);
      });
    });
  } else {
    list = order.items as IOrderProduct[];
  }

  // console.log({list})

  return list;
}
