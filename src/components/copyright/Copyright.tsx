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
import Typography, { Paragraph } from "../Typography";
import { RootState } from "features/store";

interface FooterProps {
  setup: RootState["setup"]
}

const Copyright: React.FC<FooterProps> = ({setup}) => {

  return (
    <Box bg="#efefef">
        <Container>
            <Typography fontSize=".75rem" py="0.3rem" color="gray.500">
                All rights reserved © <span style={{color: 'crimson', opacity: .7}}>{setup.footer.copyright}</span>
            </Typography>
        </Container>
    </Box>
  );
};



export default Copyright;
