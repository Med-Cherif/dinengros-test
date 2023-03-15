import Box from "@component/Box";
import {
  DashboardNavigationWrapper,
  StyledDashboardNav,
} from "@component/layout/DashboardStyle";
import { useAppDispatch, useAppSelector } from "@hook/useRedux";
import { logoutAction } from "features/actions/userActions";
import { useRouter } from "next/router";
import React, { Fragment } from "react";
import FlexBox from "../FlexBox";
import Icon from "../icon/Icon";
import Typography from "../Typography";
// import {
//   DashboardNavigationWrapper,
//   StyledDashboardNav,
// } from "../";

const UserMobikeMenu = () => {
  const { pathname, replace } = useRouter();

  const dispatch = useAppDispatch();
  const { accessToken } = useAppSelector((state) => state.users);
  const { cart, wishList } = useAppSelector((state) => state.cart);

  const logout = () => {
    dispatch(
      logoutAction({
        onSuccess() {
          replace("/login");
        },
      })
    );
  };

  const linkList = accessToken
    ? [
        {
          title: "DASHBOARD",
          list: [
            {
              href: "/orders",
              title: "Min ordre",
              iconName: "bag",
              iconType: "svg",
              count: 5,
            },
            {
              href: "/wish-list",
              title: "Favorite Produkt",
              iconName: "heart",
              iconType: "svg",
              count: wishList.length,
            },
            // {
            //   href: "/support-tickets",
            //   title: "Support Tickets",
            //   iconName: "customer-service",
            //   count: 1,
            // },
          ],
        },
        {
          title: "ACCOUNT SETTINGS",
          list: [
            {
              href: "/profile",
              title: "Profil",
              iconName: "user",
              iconType: "svg",
              // count: 3,
            },
            {
              href: "/logout",
              title: "Logout",
              iconName: "fa-solid fa-right-from-bracket",
              iconType: "font",
              onClick: logout,
              // count: 16,
            },
          ],
        },
      ]
    : [
        {
          title: "AUTHENTICATION",
          list: [
            {
              href: "/login",
              title: "Login",
              iconName: "fa-solid fa-right-to-bracket",
              iconType: "font",
              // count: 3,
            },
            {
              href: "/signup",
              title: "Sign Up",
              iconName: "fa-sharp fa-solid fa-user-plus",
              iconType: "font",
              // count: 16,
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
              isCurrentPath={
                item.href.length > 0 ? pathname.includes(item.href) : false
              }
              onClick={(e) => {
                if (item.href === "/logout") {
                  e.preventDefault();
                  item.onClick();
                }
              }}
              href={item.href}
              key={item.title}
              px="1.5rem"
              mb="1.25rem"
            >
              <FlexBox alignItems="center">
                <Box className="dashboard-nav-icon-holder">
                  {item.iconType === "svg" ? (
                    <Icon variant="small" defaultcolor="currentColor" mr="10px">
                      {item.iconName}
                    </Icon>
                  ) : (
                    <i
                      style={{
                        marginRight: "16px",
                      }}
                      className={item.iconName}
                    />
                  )}
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

export default UserMobikeMenu;
