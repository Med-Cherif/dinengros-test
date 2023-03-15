import styled, { css } from "styled-components";

export interface StyledProductUnitProps {
    selected: boolean
}
export const StyledProductUnit = styled.div<StyledProductUnitProps>`
  padding: .2rem .4rem;
  border: 1px solid crimson;
  font-size: .75rem;
  margin-inline: .2rem;
  cursor: pointer;
  transition: .2s;
  user-select: none;

  &:hover {
    background-color: crimson;
    color: white;
  }

  ${({selected}) => selected && 
    css`
        background-color: crimson;
         color: white;
    ` 
  }
`;
