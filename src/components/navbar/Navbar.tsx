import Badge from "@component/badge/Badge";
import Box from "@component/Box";
import Card from "@component/Card";
import NewCategoryMenu from "@component/categories/NewCategoryMenu";
import MenuItem from "@component/MenuItem";
import { useAppSelector } from "@hook/useRedux";
import React from "react";
import Button from "../buttons/Button";
import Categories from "../categories/Categories";
import Container from "../Container";
import FlexBox from "../FlexBox";
import Icon from "../icon/Icon";
import NavLink from "../nav-link/NavLink";
import Typography, { Span } from "../Typography";
import StyledNavbar from "./NavbarStyle";
import { useState } from "react";

export interface NavbarProps {
  navListOpen?: boolean;
}

interface Nav {
  title: string;
  url: string;
  badge: string;
  child: Nav[];
  custom?: JSX.Element;
  extLink?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ navListOpen }) => {
  const { accessToken } = useAppSelector((state) => state.users);

  const [categoriesVisible, setCategoriesVisible] = useState(false);
  const x = true;

  const navbarNavigations = !accessToken
    ? [
        {
          title: "Tilbud",
          url: "/offers",
        },
        {
          title: "Produkter",
          child: [],
          custom: categoriesVisible ? <NewCategoryMenu /> : <></>,
        },
        {
          title: "Hjem",
          url: "/",
        },
        {
          title: "Nettbutikk",
          child: [
            {
              title: "Produkter",
              url: "/categories",
            },
          ],
        },
        {
          title: "Konto",
          child: [
            {
              title: "Login",
              url: "/login",
            },
            {
              title: "Sign Up",
              url: "/signup",
            },
          ],
        },
        {
          title: "Catalogue",
          url: "/catalogue",
        },
      ]
    : [
        {
          title: "Tilbud",
          url: "/offers",
        },
        {
          title: "Produkter",
          child: [],
          custom: categoriesVisible ? <NewCategoryMenu /> : <></>,
        },
        {
          title: "Hjem",
          url: "/",
        },
        {
          title: "Nettbutikk",
          child: [
            {
              title: "Produkter",
              url: "/categories",
            },
            {
              title: "Handlekurv",
              url: "/cart",
            },
          ],
        },
        {
          title: "Konto",
          child: [
            {
              title: "Min ordre",
              url: "/orders",
            },
            {
              title: "Profil",
              url: "/profile",
            },
            {
              title: "Favorite Produkt",
              url: "/wish-list",
            },
          ],
        },
        {
          title: "Catalogue",
          url: "/catalogue",
        },
      ];

  const renderNestedNav = (list: any[], isRoot = false) => {
    return list?.map((nav: Nav) => {
      if (isRoot) {
        if (nav.url && nav.extLink)
          return (
            <NavLink
              className="nav-link"
              href={nav.url}
              key={nav.title}
              target="_blank"
              rel="noopener noreferrer"
            >
              {nav.badge ? (
                <Badge style={{ marginRight: "0px" }} title={nav.badge}>
                  {nav.title}
                </Badge>
              ) : (
                <Span className="nav-link">{nav.title}</Span>
              )}
            </NavLink>
          );
        else if (nav.url)
          return (
            <NavLink className="nav-link" href={nav.url} key={nav.title}>
              {nav.badge ? (
                <Badge style={{ marginRight: "0px" }} title={nav.badge}>
                  {nav.title}
                </Badge>
              ) : nav.title === "Tilbud" ? (
                <Span className="nav-link">
                  <Button
                    className="button-link"
                    variant="contained"
                    color="primary"
                    borderRadius={30}
                  >
                    Tilbud
                  </Button>
                </Span>
              ) : (
                <Span className="nav-link">{nav.title}</Span>
              )}
            </NavLink>
          );
        if (nav.child)
          return (
            <FlexBox
              onMouseLeave={() => {
                if (nav.custom) {
                  setCategoriesVisible(false);
                }
              }}
              className="root"
              position={nav.custom ? "static" : "relative"}
              flexDirection="column"
              alignItems="center"
              {...(nav.custom
                ? {
                    height: "100%",
                    justifyContent: "center",
                  }
                : {})}
              key={nav.title}
              onMouseEnter={() => {
                if (nav.custom) {
                  setCategoriesVisible(true);
                }
              }}
            >
              {nav.badge ? (
                <Badge title={nav.badge}>{nav.title}</Badge>
              ) : (
                <Span className="nav-link" style={{ marginRight: 32 }}>
                  {nav.title}
                </Span>
              )}
              {nav.custom ? (
                nav.custom
              ) : (
                <Box
                  style={{
                    right: 0,
                    left: "auto",
                  }}
                  className="root-child"
                >
                  <Card
                    mt="1.25rem"
                    py="0.5rem"
                    boxShadow="large"
                    minWidth="230px"
                  >
                    {renderNestedNav(nav.child)}
                  </Card>
                </Box>
              )}
            </FlexBox>
          );
      } else {
        if (nav.url)
          return (
            <NavLink href={nav.url} key={nav.title}>
              <MenuItem>
                {nav.badge ? (
                  <Badge style={{ marginRight: "0px" }} title={nav.badge}>
                    {nav.title}
                  </Badge>
                ) : (
                  <Span className="nav-link">{nav.title}</Span>
                )}
              </MenuItem>
            </NavLink>
          );

        if (nav.child)
          return (
            <Box
              className="parent"
              position="relative"
              minWidth="230px"
              key={nav.title}
            >
              <MenuItem
                style={{ display: "flex", justifyContent: "space-between" }}
                color="gray.700"
              >
                {nav.badge ? (
                  <Badge style={{ marginRight: "0px" }} title={nav.badge}>
                    {nav.title}
                  </Badge>
                ) : (
                  <Span className="nav-link">{nav.title}</Span>
                )}
                <Icon size="8px" defaultcolor="currentColor">
                  right-arrow
                </Icon>
              </MenuItem>
              <Box className="child" pl="0.5rem">
                <Card py="0.5rem" boxShadow="large" minWidth="230px">
                  {renderNestedNav(nav.child)}
                </Card>
              </Box>
            </Box>
          );
      }
    });
  };

  return (
    <StyledNavbar>
      <Container
        display="flex"
        // justifyContent="space-between"
        alignItems="center"
        height="100%"
      >
        {/* <Categories>
          <Button width="278px" height="40px" bg="body.default" variant="text">
            <Icon>categories</Icon>
            <Typography
              fontWeight="600"
              textAlign="left"
              flex="1 1 0"
              ml="10px"
              color="text.muted"
            >
              Kategori
            </Typography>
            <Icon className="dropdown-icon" variant="small">
              chevron-right
            </Icon>
          </Button>
        </Categories> */}

        <FlexBox alignItems="center" height="100%">
          {renderNestedNav(navbarNavigations, true)}
        </FlexBox>
      </Container>
    </StyledNavbar>
  );
};

export default Navbar;
