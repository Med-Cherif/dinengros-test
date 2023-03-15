import { RootState } from "features/store";
import Link from "next/link";
import React from "react";
import Container from "../Container";
import FlexBox from "../FlexBox";
import Icon from "../icon/Icon";
import StyledTopbar from "./Topbar.style";

interface TopbarProps {
  setup: RootState["setup"];
}

const Topbar: React.FC<TopbarProps> = ({ setup }) => {

  return (
    <StyledTopbar>
      <Container
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        height="100%"
      >
        <FlexBox className="topbar-left">
          <div className="logo">
              <img src={setup.header.logo} alt="logo"/>
          </div>
          <FlexBox alignItems="center">
            <Icon size="14px">phone-call</Icon>
            <span>+{setup.footer.contactInfo.phone || "+4773916548"}</span>
          </FlexBox>
          <FlexBox alignItems="center" ml="20px">
            <Icon size="14px">mail</Icon>
            <span>
              {setup.footer.contactInfo.email || "post@dinengros.no"}
            </span>
          </FlexBox>
        </FlexBox>
        <FlexBox className="topbar-right">
            <Icon size="16px" mr="5px">
              map-pin-2
            </Icon>
            <Link href={`http://www.google.com/maps/place/${setup.footer.mapInfo.latitude},${setup.footer.mapInfo.longitude}`}><a style={{color: 'white'}} target="_blank">
                Finn oss på kart
              </a></Link>
        </FlexBox>
      </Container>
    </StyledTopbar>
  );
};

export default Topbar;
