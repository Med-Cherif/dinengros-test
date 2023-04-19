import UserMobileMenu from "@component/aside/UserMobileMenu";
import { Chip } from "@component/Chip";
import Container from "@component/Container";
import Grid from "@component/grid/Grid";
import Hidden from "@component/hidden/Hidden";
import CustomerDashboardNavigation from "@component/layout/CustomerDashboardNavigation";
import MenuItem from "@component/MenuItem";
import MiniCart from "@component/mini-cart/MiniCart";
import Sidenav from "@component/sidenav/Sidenav";
import React, { useState } from "react";
import useWindowSize from "../../hooks/useWindowSize";
import Icon from "../icon/Icon";
import NavLink from "../nav-link/NavLink";
import StyledMobileNavigationBar from "./MobileNavigationBar.style";

const MobileNavigationBar: React.FC = () => {
  const width = useWindowSize();
  const cartList: any = [];

  const [isOpen, setIsOpen] = useState(false);

  const toggleAside = () => setIsOpen((current) => !current);

  return (
    width <= 900 && (
      <StyledMobileNavigationBar>
        {list.map((item) => {
          if (item?.href) {
            return (
              <NavLink className="link" href={item.href} key={item.title}>
                <Icon className="icon" variant="small">
                  {item.icon}
                </Icon>
                {item.title}

                {item.title === "Cart" && !!cartList.length && (
                  <Chip
                    bg="primary.main"
                    position="absolute"
                    color="primary.text"
                    fontWeight="600"
                    px="0.25rem"
                    top="4px"
                    left="calc(50% + 8px)"
                  >
                    {cartList.length}
                  </Chip>
                )}
              </NavLink>
            );
          }
          return (
            <Sidenav
              key={item.title}
              handle={
                <MenuItem className="link">
                  <Icon className="icon" variant="small">
                    {item.icon}
                  </Icon>
                  {item.title}
                </MenuItem>
              }
              position="left"
              open={isOpen}
              width={280}
              toggleSidenav={toggleAside}
            >
              <UserMobileMenu />
              {/* <MiniCart toggleSidenav={toggleAside} /> */}
            </Sidenav>
          );
        })}
      </StyledMobileNavigationBar>
    )
  );
};

const list = [
  {
    title: "Hjem",
    icon: "home",
    href: "/",
  },
  {
    title: "Catalogue",
    icon: "",
    href: "/catalogue",
  },
  {
    title: "Tilbud",
    icon: "hot-deal",
    href: "/offers",
  },
  {
    title: "Kategori",
    icon: "category",
    href: "/categories",
  },
  {
    title: "Handlekurv",
    icon: "bag",
    href: "/cart",
  },
  {
    title: "Profil",
    icon: "user-2",
    // href: "/profile",
  },
];

export default MobileNavigationBar;
