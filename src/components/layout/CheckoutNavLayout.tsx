import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Container from "../Container";
import Box from "../Box";
import Grid from "../grid/Grid";
import Navbar from "../navbar/Navbar";
import Stepper from "../stepper/Stepper";
import AppLayout from "./AppLayout";

const CheckoutNavLayout: React.FC = ({ children }) => {
  const [selectedStep, setSelectedStep] = useState(0);

  const router = useRouter();
  const { pathname } = router;

  const stepperList = [
    {
      title: "Handlevogn",
      disabled: false,
      icon: "fa-sharp fa-solid fa-cart-shopping",
    },
    {
      title: "Leveranse",
      disabled: true,
      icon: "fa-sharp fa-solid fa-cube",
    },
  ];

  const handleStepChange = (_step, ind) => {
    switch (ind) {
      case 0:
        router.push("/cart");
        break;
      case 1:
        router.push("/delivery");
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    switch (pathname) {
      case "/cart":
        setSelectedStep(1);
        break;
      case "/delivery":
        setSelectedStep(2);
        break;
      case "/order-confirmation":
        setSelectedStep(3);
        break;
      default:
        break;
    }
  }, [pathname]);

  return (
    <AppLayout navbar={<Navbar />}>
      <Container my="2rem">
        <Box mb="14px">
          <Grid container spacing={6}>
            <Grid item lg={8} md={8} xs={12}>
              <Stepper
                stepperList={stepperList}
                selectedStep={selectedStep}
                onChange={handleStepChange}
              />
            </Grid>
          </Grid>
        </Box>
        {children}
      </Container>
    </AppLayout>
  );
};

export default CheckoutNavLayout;
