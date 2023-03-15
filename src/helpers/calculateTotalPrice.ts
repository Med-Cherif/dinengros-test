export default function calculateTotalPrice(products: any[]) {
    return (
      products.reduce(
        (accumulator, item) => accumulator + item.price * item.qty,
        0
      ) || 0
    );
  };