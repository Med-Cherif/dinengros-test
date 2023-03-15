import Typography from "@component/Typography";
import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  & .footer-icon {
    width: 40px;
    height: 40px;
  }
`;

const FooterInfoItem = ({ icon, value }) => {
  return value ? (
    <Wrapper>
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
        dangerouslySetInnerHTML={{
          __html: icon,
        }}
      />
      <span>{value}</span>
    </Wrapper>
  ) : (
    <></>
  );
};

export default FooterInfoItem;
