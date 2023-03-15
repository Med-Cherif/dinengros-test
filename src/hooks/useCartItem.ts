import { useRef } from "react";
import { deleteCartItemAction } from "features/actions/cartActions";
import { ICartItem } from "./../interfaces/cart.d";
import { updateCartItemAction } from "./../features/actions/cartActions";
import { getProductInfo } from "./../helpers/getProductInfo";
import { extractProductImages } from "./../helpers/extractProductImages";
import { useAppSelector, useAppDispatch } from "./useRedux";
import useDebounce from "./useDebounce";

export default function useCartItem(item: ICartItem) {
  const dispatch = useAppDispatch();
  const { userData } = useAppSelector((state) => state.users);

  // const { debounceOnClick } = useDebounce({})

  const timeout = useRef<NodeJS.Timeout>(null);

  const { totalStock } = getProductInfo({
    product: item.product,
    unit: item.unit.id,
    groupId: userData?.profile?.user_group?.id || 1,
  });

  const images = extractProductImages(item.product);

  const handleQuantityChange = (value: number) => {
    if (value < 1) return;
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      dispatch(updateCartItemAction(item.id, value));
    }, 400);
  };

  const deleteCartItem = () => {
    dispatch(deleteCartItemAction(item.id));
  };

  return {
    images,
    totalStock,
    handleQuantityChange,
    deleteCartItem,
  };
}
