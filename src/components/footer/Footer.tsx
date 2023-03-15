import AppStore from "@component/AppStore";
import Image from "@component/Image";
import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { getTheme } from "../../utils/utils";
import Box from "../Box";
import Container from "../Container";
import FlexBox from "../FlexBox";
import Grid from "../grid/Grid";
import Icon from "../icon/Icon";
import Typography from "../Typography";
import { RootState } from "features/store";
import { useAppSelector } from "@hook/useRedux";
import { downloadFile } from "@helpers/downloadFile";
import FooterInfoItem from "./FooterInfoItem";

const StyledLink = styled.a`
  position: relative;
  display: block;
  padding: 0.3rem 0rem;
  color: #fff;
  transition: color ease 0.4s;
  cursor: pointer;
  border-radius: 4px;
  :hover {
    color: ${getTheme("colors.primary.main")};
  }
`;

interface FooterProps {
  setup: RootState["setup"];
}

const Footer: React.FC<FooterProps> = ({ setup }) => {
  const getIcons = () => {
    return [
      { iconName: "facebook", url: setup.footer.socialMedia.facebook },
      { iconName: "twitter", url: setup.footer.socialMedia.twitter },
      {
        iconName: "youtube",
        url: setup.footer.socialMedia.youtube,
      },
      { iconName: "instagram", url: setup.footer.socialMedia.instagram },
    ];
  };

  const { categories } = useAppSelector((state) => state.categories);

  const { catalogue } = useAppSelector((state) => state.setup.footer);

  const footerCategories = categories.slice(0, 5).map((category) => {
    return {
      title: category.name,
      to: `/categories/${category.id}`,
    };
  });

  const footerPages = [
    {
      title: "Hjem",
      to: "/",
    },
    {
      title: "Kontakt oss",
      to: "/contact-us",
    },
    {
      title: "Alle produkter",
      to: "/categories",
    },
    {
      title: "Om Oss",
      to: "/about-us",
    },
    {
      title: "Terms and policy",
      to: "/terms-and-policy",
    },
  ];

  return (
    <footer>
      <Box bg="#25282e">
        <Container p="1rem" color="white">
          <Box py="5rem" overflow="hidden">
            <Grid container spacing={4}>
              <Grid item lg={4} md={12} xs={12}>
                {setup.footer.logo ? (
                  <Image src={setup.footer.logo} height="70" />
                ) : (
                  <></>
                )}

                <FooterInfoItem
                  value={setup.footer.contactInfo.address}
                  icon='<lord-icon src="https://cdn.lordicon.com/fihkmkwt.json" class="footer-icon" trigger="loop" colors="primary:#121331,secondary:#e94560"></lord-icon>'
                />
                <FooterInfoItem
                  value={setup.footer.contactInfo.email}
                  icon='<lord-icon src="https://cdn.lordicon.com/tkgyrmwc.json" class="footer-icon" trigger="loop" colors="primary:#e94560,secondary:#08a88a"></lord-icon'
                />

                <FooterInfoItem
                  value={setup.footer.contactInfo.phone}
                  icon='<lord-icon src="https://cdn.lordicon.com/tftaqjwp.json" class="footer-icon" trigger="loop" colors="primary:#e94560,secondary:#08a88a"></lord-icon'
                />

                <FooterInfoItem
                  value={
                    setup.footer.socialMedia.whatsapp
                      ? `${setup.footer.socialMedia.whatsapp} (Whatsapp)`
                      : null
                  }
                  icon='<lord-icon src="https://cdn.lordicon.com/zeabctil.json" class="footer-icon" trigger="loop" colors="outline:#121331,primary:#e94560,secondary:#ebe6ef"></lord-icon'
                />

                <FlexBox className="flex" mx="-5px">
                  {getIcons()
                    .filter((item) => !!item.url)
                    .map(
                      (item) =>
                        item.url && (
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noreferrer noopenner"
                            key={item.iconName}
                          >
                            <Box
                              m="5px"
                              size="small"
                              p="10px"
                              bg="rgba(0,0,0,0.2)"
                              borderRadius="50%"
                            >
                              <Icon size="12px" defaultcolor="auto">
                                {item.iconName}
                              </Icon>
                            </Box>
                          </a>
                        )
                    )}
                </FlexBox>
              </Grid>

              <Grid item lg={2} md={6} xs={12}>
                <Typography
                  fontSize="25px"
                  fontWeight="700"
                  mb="1.25rem"
                  lineHeight="1"
                >
                  Sider
                </Typography>

                <div>
                  {footerPages.map((item, ind) => (
                    <Link href={item.to} key={ind}>
                      <StyledLink>{item.title}</StyledLink>
                    </Link>
                  ))}
                  {catalogue.path && (
                    <span
                      onClick={() =>
                        downloadFile(catalogue.path, catalogue.name)
                      }
                      style={{ cursor: "pointer" }}
                    >
                      Catalogue
                    </span>
                  )}
                </div>
              </Grid>

              <Grid item lg={2} md={6} xs={12}>
                <Typography
                  fontSize="25px"
                  fontWeight="700"
                  mb="1.25rem"
                  lineHeight="1"
                >
                  Kategori
                </Typography>

                <div>
                  {footerCategories.map((item, ind) => (
                    <Link href={item.to} key={ind}>
                      <StyledLink>{item.title}</StyledLink>
                    </Link>
                  ))}
                </div>
              </Grid>
              {setup.footer.mapInfo.latitude ? (
                <Grid item lg={4} md={12} xs={12}>
                  <iframe
                    src={`https://maps.google.com/maps?q=${setup.footer.mapInfo.latitude},${setup.footer.mapInfo.longitude}&hl=en&z=14&output=embed`}
                    width="600"
                    height="230"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </Grid>
              ) : (
                <></>
              )}
            </Grid>
          </Box>
        </Container>
      </Box>
    </footer>
  );
};

export default Footer;
