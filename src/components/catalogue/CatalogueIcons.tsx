import FlexBox from "@component/FlexBox";
import Icon from "@component/icon/Icon";
import styled from "styled-components";

interface IProps {
  icon: string;
  onTopIconClick: () => void;
  onCenterIconClick: () => void;
}

const StyledIcon = styled("div")(() => {
  return {
    cursor: "pointer",
    display: "flex",
    fontSize: 22,
    transition: "transform .3s",
    "&:hover": {
      transform: "scale(1.3)",
    },
  };
});

const CatalogueIcon = ({ icon, onTopIconClick, onCenterIconClick }: IProps) => {
  return (
    <FlexBox flexDirection={"column"} justifyContent={"space-between"}>
      {/* <StyledIcon>{topIcon}</StyledIcon> */}
      <StyledIcon onClick={onTopIconClick}>
        <i className={`fa-solid fa-chevron-${icon}`}></i>
        <i className={`fa-solid fa-chevron-${icon}`}></i>
      </StyledIcon>
      <StyledIcon onClick={onCenterIconClick}>
        <i className={`fa-solid fa-chevron-${icon}`}></i>
      </StyledIcon>
      <div></div>
    </FlexBox>
  );
};

export default CatalogueIcon;
