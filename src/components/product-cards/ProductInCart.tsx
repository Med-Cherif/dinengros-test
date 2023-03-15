import { useRef } from "react";
import Button from "@component/buttons/Button";
import FlexBox from "@component/FlexBox";
import Icon from "@component/icon/Icon";
import Typography from "@component/Typography";
import useCartItem from "@hook/useCartItem";
import { ICartItem } from "interfaces/cart";
import useLoading from "@hook/useLoading";

interface IProps {
  cartItem: ICartItem;
}

const ProductInCart = ({ cartItem }: IProps) => {
  const { deleteCartItem, handleQuantityChange, images, totalStock } =
    useCartItem(cartItem);

  const { isLoading, load, stopLoad } = useLoading();

  const timeout = useRef<NodeJS.Timeout>(null);

  return (
    <FlexBox alignItems="end">
      <FlexBox alignItems="center">
        <Button
          variant="outlined"
          color="primary"
          padding="2px"
          size="none"
          type="button"
          borderColor="primary.light"
          disabled={!cartItem}
          onClick={() => {
            if (cartItem.qty === 1) {
              clearTimeout(timeout.current);
              timeout.current = setTimeout(() => {
                deleteCartItem();
              }, 400);
            } else {
              handleQuantityChange(cartItem.qty - 1);
            }
          }}
        >
          <Icon variant="small">minus</Icon>
        </Button>
        <Typography mx="0.5rem" fontWeight="600" fontSize="15px">
          {cartItem?.qty || 0}
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          padding="2px"
          size="none"
          type="button"
          borderColor="primary.light"
          onClick={() => {
            handleQuantityChange(cartItem.qty + 1);
          }}
          //   disabled={cartItem.qty === 100}
        >
          <Icon variant="small">plus</Icon>
        </Button>
      </FlexBox>
    </FlexBox>
  );
};

export default ProductInCart;
