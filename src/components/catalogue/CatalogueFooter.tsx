import FlexBox from "@component/FlexBox";
import Typography from "@component/Typography";
import { useAppSelector } from "@hook/useRedux";
import Link from "next/link";
import React from "react";

const CatalogueFooter = () => {
  const setup = useAppSelector((state) => state.setup);

  return (
    <FlexBox
      backgroundColor="#232323"
      paddingX={3}
      paddingY={2}
      justifyContent="center"
    >
      <Typography fontSize=".9rem" color="gray.500">
        All rights reserved ©{" "}
        <span style={{ color: "crimson" }}>{setup.footer.copyright}</span>
      </Typography>
    </FlexBox>
  );
};

export default CatalogueFooter;
