import Avatar from "@component/avatar/Avatar";
import Box from "@component/Box";
import Button from "@component/buttons/Button";
import Card from "@component/Card";
import FlexBox from "@component/FlexBox";
import Grid from "@component/grid/Grid";
import DashboardLayout from "@component/layout/CustomerDashboardLayout";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import TableRow from "@component/TableRow";
import Typography, { H3, H5, Small } from "@component/Typography";
import { useAppSelector } from "@hook/useRedux";
import { format } from "date-fns";
import Link from "next/link";
import React from "react";

const Profile = () => {
  const { userData } = useAppSelector((state) => state.users);
  const { orders } = useAppSelector((state) => state.orders);
  const { cart, wishList } = useAppSelector((state) => state.cart);

  const infoList = [
    {
      title: orders.length,
      subtitle: "Min ordre",
    },
    {
      title: cart.length,
      subtitle: "Handlevogn",
    },
    {
      title: wishList.length,
      subtitle: "Favorite Produkt",
    },
  ];

  return (
    <div>
      <DashboardPageHeader
        iconName="user_filled"
        title="Min Profil"
        button={
          <Link href="/profile/edit">
            <Button color="primary" bg="primary.light" px="2rem">
              Rediger profil
            </Button>
          </Link>
        }
      />

      <Box mb="30px">
        <Grid container spacing={6}>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <FlexBox as={Card} p="14px 32px" height="100%" alignItems="center">
              {/* <Avatar src="/assets/images/faces/ralph.png" size={64} /> */}
              <Box ml="12px" flex="1 1 0">
                <FlexBox
                  flexWrap="wrap"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <div>
                    <H5 my="0px">
                      {userData.first_name} {userData.last_name}
                    </H5>
                    <FlexBox alignItems="center"></FlexBox>
                  </div>

                  <Typography
                    ontSize="14px"
                    color="text.hint"
                    letterSpacing="0.2em"
                  >
                    {userData.is_company ? "Company" : "User"}
                  </Typography>
                </FlexBox>
              </Box>
            </FlexBox>
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Grid container spacing={4}>
              {infoList.map((item) => (
                <Grid item lg={4} sm={6} xs={6} key={item.subtitle}>
                  <FlexBox
                    as={Card}
                    flexDirection="column"
                    alignItems="center"
                    height="100%"
                    p="1rem 1.25rem"
                  >
                    <H3 color="primary.main" my="0px" fontWeight="600">
                      {item.title}
                    </H3>
                    <Small color="text.muted" textAlign="center">
                      {item.subtitle}
                    </Small>
                  </FlexBox>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>

      <TableRow p="0.75rem 1.5rem">
        {/* <FlexBox flexDirection="column" p="0.5rem">
          <Small color="text.muted" mb="4px" textAlign="left">
            First Name
          </Small>
          <span>{userData.first_name}</span>
        </FlexBox>
        <FlexBox flexDirection="column" p="0.5rem">
          <Small color="text.muted" mb="4px" textAlign="left">
            Last Name
          </Small>
          <span>{userData.last_name}</span>
        </FlexBox> */}
        <FlexBox flexDirection="column" p="0.5rem">
          <Small color="text.muted" mb="4px" textAlign="left">
            Email
          </Small>
          <span>{userData.email}</span>
        </FlexBox>
        <FlexBox flexDirection="column" p="0.5rem">
          <Small color="text.muted" mb="4px" textAlign="left">
            Phone
          </Small>
          <span>{userData.phone}</span>
        </FlexBox>
        <FlexBox flexDirection="column" p="0.5rem">
          <Small color="text.muted" mb="4px">
            City
          </Small>
          <span className="pre">{userData.address.city}</span>
        </FlexBox>
        <FlexBox flexDirection="column" p="0.5rem">
          <Small color="text.muted" mb="4px">
            Street
          </Small>
          <span className="pre">{userData.address.street_name}</span>
        </FlexBox>
        <FlexBox flexDirection="column" p="0.5rem">
          <Small color="text.muted" mb="4px">
            Postal Code
          </Small>
          <span className="pre">{userData.address.zip_code}</span>
        </FlexBox>
      </TableRow>
    </div>
  );
};

Profile.layout = DashboardLayout;

export default Profile;
