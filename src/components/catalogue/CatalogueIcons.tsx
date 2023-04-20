import FlexBox from "@component/FlexBox";
import Icon from "@component/icon/Icon";
import styled from "styled-components";

interface IProps {
  icon: string;
  onTopIconClick: () => void;
  onCenterIconClick: () => void;
}

const StyledIcon = styled("div")`
  cursor: pointer;
  display: flex;
  font-size: 22px;
  transition: transform 0.3s;
  @media (max-width: 575px) {
    display: none;
  }
  @media (min-width: 768px) {
    &:hover {
      transform: scale(1.3);
    }
  }
`;

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
