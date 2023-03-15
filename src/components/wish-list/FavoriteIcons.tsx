import Icon from "@component/icon/Icon";
import { useAppDispatch, useAppSelector } from "@hook/useRedux";
import {
  addItemToWishListAction,
  deleteWishListItemAction,
} from "features/actions/wishListActions";
import { useRouter } from "next/router";
import React from "react";

interface IProps {
  productID: number | string;
  onAddClick?: () => void;
  onRemoveClick?: () => void;
}

const FavoriteIcons = ({ productID, onAddClick, onRemoveClick }: IProps) => {
  const { wishList } = useAppSelector((state) => state.cart);
  const { accessToken } = useAppSelector((state) => state.users);

  const router = useRouter();

  const dispatch = useAppDispatch();

  const favoriteItem = wishList.find((item) => item.product?.id === productID);

  const addToWishlist = () => {
    if (!accessToken) {
      router.push(`/login`);
      return;
    }
    if (onAddClick) {
      onAddClick();
    } else {
      dispatch(addItemToWishListAction({}, productID));
    }
  };

  const deleteFromWishlist = () => {
    if (!accessToken) {
      router.push(`/login`);
      return;
    }
    if (onRemoveClick) {
      onRemoveClick();
    } else {
      dispatch(deleteWishListItemAction({}, favoriteItem.id));
    }
  };

  return (
    <>
      {favoriteItem ? (
        <Icon
          onClick={deleteFromWishlist}
          className="favorite-icon"
          color="primary"
          variant="small"
          style={{ cursor: "pointer" }}
        >
          heart-filled
        </Icon>
      ) : (
        <Icon
          onClick={addToWishlist}
          className="favorite-icon outlined-icon"
          variant="small"
          style={{ cursor: "pointer" }}
        >
          heart
        </Icon>
      )}
    </>
  );
};

export default FavoriteIcons;
