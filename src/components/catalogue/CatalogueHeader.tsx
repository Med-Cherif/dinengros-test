import FlexBox from "@component/FlexBox";
import Image from "@component/Image";
import { useAppSelector } from "@hook/useRedux";
import Link from "next/link";
import React from "react";

const CatalogueHeader = () => {
  const setup = useAppSelector((state) => state.setup);

  return (
    <FlexBox backgroundColor="#232323" paddingX={3} paddingY={2}>
      <Link href="/">
        <a>
          {setup.header.logo ? (
            <Image src={setup.header.logo} alt="logo" maxHeight={48} />
          ) : (
            <h1 style={{ color: "crimson", textTransform: "uppercase" }}>
              {setup.website.name}
            </h1>
          )}
        </a>
      </Link>
    </FlexBox>
  );
};

export default CatalogueHeader;
