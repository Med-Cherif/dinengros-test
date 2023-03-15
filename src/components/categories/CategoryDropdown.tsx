import { getNavigationData } from "@helpers/getNavigationData";
import React from "react";
import CategoryMenuItem from "./category-menu-item/CategoryMenuItem";
import { StyledCategoryDropdown } from "./CategoryDropdownStyle";
import MegaMenu1 from "./mega-menu/MegaMenu1";
import MegaMenu2 from "./mega-menu/MegaMenu2";

export interface CategoryDropdownProps {
  open: boolean;
  position?: "absolute" | "relative";
  categories?: any
}

const CategoryDropdown: React.FC<CategoryDropdownProps> = ({
  open,
  position,
  categories
}) => {
  const megaMenu = {
    MegaMenu1,
    MegaMenu2,
  };

  const navigations = getNavigationData(categories);

  return (
    <StyledCategoryDropdown open={open} position={position}>
      {navigations.slice(0, 10).map((item) => {
        let MegaMenu = megaMenu[item.menuComponent];

        return (
          <CategoryMenuItem
            title={item.title}
            href={item.href}
            icon={item.icon}
            caret={!!item.menuData.categories.length}
            key={item.title}
          >
            {!!item.menuData.categories.length && <MegaMenu data={item.menuData || {}} />}
          </CategoryMenuItem>
        );
      })}
      {navigations.length > 10 && 
          <CategoryMenuItem
            title='Vis alle...'
            href='/categories'
            caret={false}
          >
          </CategoryMenuItem>
      }
    </StyledCategoryDropdown>
  );
};

CategoryDropdown.defaultProps = {
  position: "absolute",
};

export default CategoryDropdown;
