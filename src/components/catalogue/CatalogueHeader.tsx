import { useEffect } from "react";
import FlexBox from "@component/FlexBox";
import Image from "@component/Image";
import { useAppSelector } from "@hook/useRedux";
import Link from "next/link";
import React from "react";
import Typography from "@component/Typography";
import styled from "styled-components";

const StyledPagesControl = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  @media (max-width: 767px) {
    position: static;
    transform: none;
  }
`;

const CatalogueHeader = ({ activePage, childrenCount }) => {
  const setup = useAppSelector((state) => state.setup);

  return (
    <FlexBox
      backgroundColor="#232323"
      paddingX={3}
      paddingY={2}
      zIndex={2}
      alignItems="center"
      position="relative"
      justifyContent="space-between"
    >
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
      <StyledPagesControl>
        <Typography fontWeight={600} color="white">
          {activePage} / {childrenCount}
        </Typography>
      </StyledPagesControl>
    </FlexBox>
  );
};

export default CatalogueHeader;
