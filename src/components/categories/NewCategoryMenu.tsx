import Typography from "@component/Typography";
import { useAppSelector } from "@hook/useRedux";
import Link from "next/link";
import React from "react";
import styled from "styled-components";
import NoImage from "../../../public/assets/images/products/no-image.jpg";

const CategoryMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: #fff;
  padding: 32px 38px;
`;

const CategoryMenuList = styled.div`
  display: grid;
  align-items: stretch;
  grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
  gap: 20px;
`;

const CategoryItem = styled.div`
  text-align: center;
  border: 1px solid #ebebeb;
  padding: 16px 10px;
  border-radius: 0;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 8px;
  background: linear-gradient(359deg, #ffffff 42%, #e0e7ef);
  box-shadow: 0 1px 0.2rem #00000036;
  position: relative;
`;

const NewCategoryMenu = () => {
  const { categories } = useAppSelector((state) => state.categories);

  const { noProductImage } = useAppSelector((state) => state.setup.images);

  //   console.log(categories);

  return (
    <CategoryMenu>
      <CategoryMenuList>
        {categories.map((category) => {
          return (
            <Link href={`/categories/${category.id}`} key={category.id}>
              <a>
                <CategoryItem>
                  <img
                    src={category.image || noProductImage || NoImage.src}
                    alt=""
                    width={50}
                    height={50}
                    style={{ objectFit: "contain" }}
                  />
                  <Typography>{category.name}</Typography>
                </CategoryItem>
              </a>
            </Link>
          );
        })}
      </CategoryMenuList>
    </CategoryMenu>
  );
};

export default NewCategoryMenu;
