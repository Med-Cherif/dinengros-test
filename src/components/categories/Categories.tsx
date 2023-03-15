import { useAppSelector } from "@hook/useRedux";
import React, { useEffect, useRef, useState } from "react";
import CategoryDropdown from "./CategoryDropdown";
import { StyledCategory } from "./CategoryStyle";

export interface CategoriesProps {
  children: React.ReactElement;
}

const Categories: React.FC<CategoriesProps> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const popoverRef = useRef(open);
  popoverRef.current = open;

  const toggleMenu = (e) => {
    e.stopPropagation();
    setOpen(!open);
  };

  const handleDocumentClick = () => {
    if (popoverRef.current && !open) setOpen(false);
  };

  useEffect(() => {
    window.addEventListener("click", handleDocumentClick);
    return () => {
      window.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  const {categories} = useAppSelector(state => state.categories);

  return (
    <StyledCategory open={open}>
      {React.cloneElement(children, {
        open,
        className: `${children.props.className} cursor-pointer`,
        onClick: toggleMenu,
      })}
      <CategoryDropdown 
        open={open} 
        categories={categories}
      />
    </StyledCategory>
  );
};

export default Categories;
