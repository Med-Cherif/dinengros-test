import Box from "@component/Box";
import { useAppSelector } from "@hook/useRedux";
import { useRouter } from "next/router";
import React, { Fragment } from "react";
import FlexBox from "../FlexBox";
import Icon from "../icon/Icon";
import Typography from "../Typography";
import {
  DashboardNavigationWrapper,
  StyledDashboardNav,
} from "./DashboardStyle";

const CustomerDashboardNavigation = () => {
  const { pathname } = useRouter();

  const { cart, wishList } = useAppSelector((state) => state.cart);
  const {orders} = useAppSelector(state => state.orders);
  const {userDiscounts} = useAppSelector(state => state.products);

  const linkList = [
    {
      title: "DASHBOARD",
      list: [
        {
          href: "/cart",
          title: "Handlevogn",
          iconName: "bag",
          count: cart.length,
        },
        {
          href: "/wish-list",
          title: "Favorite Produkter",
          iconName: "heart",
          count: wishList.length,
        },
        {
          href: "/orders",
          title: "Min ordre",
          iconName: "bag",
          count: orders.length,
        },

        {
          href: "/my-discounts",
          title: "Min rabatter",
          iconName: "hot-deal",
          count: userDiscounts.length,
        },

      ],
    },
    {
    title: "ACCOUNT SETTINGS",
    list: [
      {
        href: "/profile",
        title: "Profil",
        iconName: "user",
        // count: 3,
      },
      {
        href: "/address",
        title: "Adresse",
        iconName: "pin",
        // count: 16,
      },
      {
        href: "/update-password",
        title: "Passord",
        iconName: "icon-lock",
        // count: 4,
      },
    ],
  },
  ];

  return (
    <DashboardNavigationWrapper px="0px" pb="1.5rem" color="gray.900">
      {linkList.map((item) => (
        <Fragment key={item.title}>
          <Typography p="26px 30px 1rem" color="text.muted" fontSize="12px">
            {item.title}
          </Typography>
          {item.list.map((item) => (
            <StyledDashboardNav
              isCurrentPath={pathname.includes(item.href)}
              href={item.href}
              key={item.title}
              px="1.5rem"
              mb="1.25rem"
            >
              <FlexBox alignItems="center">
                <Box className="dashboard-nav-icon-holder">
                  <Icon variant="small" defaultcolor="currentColor" mr="10px">
                    {item.iconName}
                  </Icon>
                </Box>
                <span>{item.title}</span>
              </FlexBox>
              <span>{item.count}</span>
            </StyledDashboardNav>
          ))}
        </Fragment>
      ))}
    </DashboardNavigationWrapper>
  );
};

export default CustomerDashboardNavigation;
