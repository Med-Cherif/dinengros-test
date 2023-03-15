import IconButton from "@component/buttons/IconButton";
import Image from "@component/Image";
import Menu from "@component/Menu";
import MenuItem from "@component/MenuItem";
import NavLink from "@component/nav-link/NavLink";
import AdvancedSearchBox from "@component/search-box/AdvancedSearchBox";
import { StyledSessionCard } from "@component/sessions/SessionStyle";
import { useAppDispatch, useAppSelector } from "@hook/useRedux";
import { logoutAction } from "features/actions/userActions";
import { RootState } from "features/store";
import getCartLength from "helpers/getCartSize";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Box from "../Box";
import Categories from "../categories/Categories";
import Container from "../Container";
import FlexBox from "../FlexBox";
import Icon from "../icon/Icon";
import MiniCart from "../mini-cart/MiniCart";
import Login from "../sessions/Login";
import Sidenav from "../sidenav/Sidenav";
import { H6, SemiSpan, Tiny } from "../Typography";
import StyledHeader from "./HeaderStyle";
import UserLoginDialog from "./UserLoginDialog";

type HeaderProps = {
  isFixed?: boolean;
  className?: string;
  setup: RootState["setup"];
};

const Header: React.FC<HeaderProps> = ({ isFixed, className, setup }) => {
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const toggleSidenav = () => setOpen(!open);

  const router = useRouter();

  const dispatch = useAppDispatch();

  const { accessToken } = useAppSelector((state) => state.users);
  const { cart, wishList } = useAppSelector((state) => state.cart);

  const length = getCartLength(cart);

  const logout = () => {
    dispatch(
      logoutAction({
        onSuccess() {
          router.reload();
        },
      })
    );
  };

  const cartHandle = (
    <FlexBox ml="16px" alignItems="flex-start">
      <IconButton bg="gray.200" p="12px">
        <Icon size="20px">bag</Icon>
      </IconButton>

      <FlexBox
        borderRadius="300px"
        bg="error.main"
        px="5px"
        py="2px"
        alignItems="center"
        justifyContent="center"
        ml="-1rem"
        mt="-9px"
      >
        <Tiny color="white" fontWeight="600">
          {length}
        </Tiny>
      </FlexBox>
    </FlexBox>
  );

  return (
    <StyledHeader className={className}>
      <Container
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        height="100%"
      >
        <FlexBox className="logo" alignItems="center" mr="1rem">
          <Link href="/">
            <a>
              {setup.header.logo ? (
                <Image src={setup.header.logo} alt="logo" maxHeight={65} />
              ) : (
                <h1 style={{ color: "crimson", textTransform: "uppercase" }}>
                  {setup.website.name}
                </h1>
              )}
            </a>
          </Link>

          {/* {isFixed && (
            <div className="category-holder">
              <Categories>
                <FlexBox color="text.hint" alignItems="center" ml="1rem">
                  <Icon>categories</Icon>
                  <Icon>arrow-down-filled</Icon>
                </FlexBox>
              </Categories>
            </div>
          )} */}
        </FlexBox>

        <FlexBox justifyContent="center" flex="1 1 0">
          <AdvancedSearchBox />
        </FlexBox>

        <FlexBox className="header-right" alignItems="center">
          {accessToken ? (
            <Menu
              direction="right"
              handler={
                <IconButton ml="1rem" bg="gray.200" p="8px">
                  <Icon size="28px">user</Icon>
                </IconButton>
              }
            >
              <NavLink href="/profile">
                <MenuItem>Profil</MenuItem>
              </NavLink>
              <MenuItem onClick={logout}>Logg ut</MenuItem>
            </Menu>
          ) : (
            <UserLoginDialog
              open={modalOpen}
              setOpen={setModalOpen}
              handle={
                <IconButton ml="1rem" bg="gray.200" p="8px">
                  <Icon size="28px">user</Icon>
                </IconButton>
              }
            >
              <Box>
                <StyledSessionCard mx="auto" my="2rem" boxShadow="large">
                  <Login closeModal={() => setModalOpen(false)} />
                  <FlexBox justifyContent="center" mb="1.25rem">
                    <SemiSpan>Har du glemt passordet ditt?</SemiSpan>
                    <Link href="/signup">
                      <a>
                        <H6
                          ml="0.5rem"
                          borderBottom="1px solid"
                          borderColor="gray.900"
                        >
                          Registrer ny konto
                        </H6>
                      </a>
                    </Link>
                  </FlexBox>
                </StyledSessionCard>
              </Box>
            </UserLoginDialog>
          )}

          <Sidenav
            handle={cartHandle}
            position="right"
            open={open}
            width={380}
            toggleSidenav={toggleSidenav}
          >
            <MiniCart toggleSidenav={toggleSidenav} />
          </Sidenav>
          <NavLink href="/wish-list">
            <FlexBox ml="16px" alignItems="flex-start">
              <IconButton bg="gray.200" p="12px">
                <Icon size="20px">heart</Icon>
              </IconButton>

              <FlexBox
                borderRadius="300px"
                bg="error.main"
                px="5px"
                py="2px"
                alignItems="center"
                justifyContent="center"
                ml="-1rem"
                mt="-9px"
              >
                <Tiny color="white" fontWeight="600">
                  {wishList.length}
                </Tiny>
              </FlexBox>
            </FlexBox>
          </NavLink>
        </FlexBox>
      </Container>
    </StyledHeader>
  );
};

export default Header;
