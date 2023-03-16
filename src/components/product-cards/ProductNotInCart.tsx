import Button from "@component/buttons/Button";
import FlexBox from "@component/FlexBox";
import Icon from "@component/icon/Icon";
import Typography from "@component/Typography";
import useLoading from "@hook/useLoading";

interface IProps {
  addProductToCart: (onSuccess?: () => void) => void;
  isLoading: boolean;
}

const ProductNotInCart = ({ isLoading, addProductToCart }: IProps) => {
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
          disabled={true}
        >
          <Icon variant="small">minus</Icon>
        </Button>
        <Typography mx="0.5rem" fontWeight="600" fontSize="15px">
          0
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          padding="2px"
          size="none"
          type="button"
          disabled={isLoading}
          borderColor="primary.light"
          onClick={(e) => {
            e.stopPropagation();

            // load();
            addProductToCart(() => {
              // stopLoad();
            });
          }}
          //   disabled={cartItem.qty === 100}
        >
          <Icon variant="small">plus</Icon>
        </Button>
      </FlexBox>
    </FlexBox>
  );
};

export default ProductNotInCart;
