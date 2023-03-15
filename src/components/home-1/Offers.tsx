import { getAllDiscounts } from "apis/products/productsApi";
import { useEffect } from "react";
import useSWR from "swr";
import styled from "styled-components";
import Typography from "@component/Typography";
import Box from "@component/Box";
import Container from "@component/Container";
import { themeGet } from "@styled-system/theme-get";
import Link from "next/link";
import extractImage from "@helpers/extractImage";

const OffersWrapper = styled.div`
  display: flex;
  align-items: stretch;
  flex-wrap: wrap;
  justify-content: center;
  gap: 28px;
`;

const StyledLink = styled.a`
  display: inline-block;
  width: calc(33.3333% - 28px);

  @media (max-width: 991px) {
    width: calc(50% - 28px);
  }

  @media (max-width: 767px) {
    width: 100%;
  }
`;

const OfferItem = styled.div`
  position: relative;
  min-height: 250px;
  border-radius: 6px;
  display: flex;
  border: 1px solid #ebebeb;
  overflow: hidden;
  flex-direction: column;
  cursor: pointer;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
  &:hover img {
    transform: scale(1.05);
  }
  &:after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      1deg,
      rgba(23, 20, 18, 0.8) 0.77%,
      rgba(23, 20, 18, 0.09) 48.31%
    );
    text-shadow: 0 0 6px rgb(0 0 0 / 50%);
  }
`;

const OfferImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: inherit;
  transition: transform 0.3s ease;
`;

const OfferNoImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #333;
`;

const OfferContent = styled.div`
  position: relative;
  display: flex;
  padding: 0 24px 24px;
  align-items: end;
  color: #fff;
  z-index: 1;
  /* color: ${themeGet("colors.primary.main")}; */
  flex: 1;
  & > * {
    /* text-shadow: 0 2px 2px rgba(0, 0, 0, 0.4); */
  }
`;

const Offers = () => {
  const { data } = useSWR("/offers", () => getAllDiscounts());

  const offers = data?.data?.data || [];

  return (
    <Box mb="3.75rem">
      <Container>
        <OffersWrapper>
          {offers.map((offer, i) => {
            const imageSrc = extractImage(offer.image);
            return (
              <Link key={offer.id} href={`/offers/${offer.id}`} passHref>
                <StyledLink>
                  <OfferItem>
                    {imageSrc ? (
                      <OfferImage src={imageSrc} alt="" />
                    ) : (
                      <OfferNoImage />
                    )}
                    <OfferContent>
                      <div>
                        <Typography fontSize="22px" fontWeight="700">
                          {offer.title}
                        </Typography>
                        <Typography fontSize="14px">
                          {offer.start_at} - {offer.end_at}
                        </Typography>
                      </div>
                    </OfferContent>
                  </OfferItem>
                </StyledLink>
              </Link>
            );
          })}
        </OffersWrapper>
      </Container>
    </Box>
  );
};

export default Offers;
