import React from "react";
import Box from "../Box";
import { CardProps } from "../Card";
import FlexBox from "../FlexBox";
import { H3 } from "../Typography";
import TransportImage from "../../../public/assets/images/illustrations/delivery-truck.svg";
import DefaultDeliveryImage from "../../../public/assets/images/illustrations/self-get.svg";
import { StyledProductCard1 } from "@component/product-cards/ProductCardStyle";
import { IDeliveryMethod } from "interfaces/delivery-method";
import { Player, Controls } from "@lottiefiles/react-lottie-player";

export interface IProps extends CardProps {
  deliveryMethod: IDeliveryMethod;
  selectedMethod: string | null;
  selectDeliveryMethod: () => void;
}

const DeliveryMethodCard: React.FC<IProps> = ({
  deliveryMethod,
  selectDeliveryMethod,
  selectedMethod,
  ...props
}) => {
  let borderStyle =
    deliveryMethod.name === selectedMethod
      ? {
          borderColor: "primary.main",
          borderWidth: "4px",
          borderStyle: "solid",
        }
      : {};

  // console.log(borderStyle);

  return (
    <StyledProductCard1
      {...props}
      style={{
        cursor: "pointer",
        width: "100%",
        // maxWidth: 200,
      }}
      onClick={selectDeliveryMethod}
      {...borderStyle}
    >
      <div className="">
        <Player
          autoplay
          loop
          src={
            deliveryMethod?.name?.toLowerCase() !== "delivery"
              ? "https://assets6.lottiefiles.com/private_files/lf30_f0fhps6k.json"
              : "https://assets5.lottiefiles.com/packages/lf20_toa6tsan.json"
          }
          style={{
            maxWidth: "100%",
            height: 240,
            // aspectRatio: "2/2",
            objectFit: "contain",
          }}
        ></Player>
      </div>
      <div className="details">
        <FlexBox>
          <Box flex="1 1 0" minWidth="0px" mr="0.5rem">
            <H3
              className="title"
              fontSize="14px"
              textAlign="left"
              fontWeight="600"
              color="text.secondary"
              mb="10px"
              title={
                deliveryMethod?.name?.toLowerCase() === "delivery"
                  ? "Leveranse"
                  : "Få deg selv"
              }
            >
              {deliveryMethod?.name?.toLowerCase() === "delivery"
                ? "Leveranse"
                : "Få deg selv"}
            </H3>
          </Box>
        </FlexBox>
      </div>
    </StyledProductCard1>
  );
};

export default DeliveryMethodCard;
