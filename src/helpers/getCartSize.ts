export default function getCartLength(cartItems: any[]) {
    return cartItems.reduce((acc, item) => {
        return acc + item.qty
    }, 0)
}