import Divider from "@component/Divider";
import { ICategory } from "interfaces/category";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import Accordion from "../accordion/Accordion";
import AccordionHeader from "../accordion/AccordionHeader";
import Card from "../Card";
import FlexBox from "../FlexBox";
import { H6, Paragraph, SemiSpan } from "../Typography";

export interface ProductFilterCardProps {
  categories: ICategory[] | null;
}

const ProductFilterCard: React.FC<ProductFilterCardProps> = ({
  categories,
}) => {
  const router = useRouter();

  return (
    <Card p="18px 27px" elevation={5}>
      <H6 mb="10px">Kategori</H6>
      {categories?.map((category) =>
        category?.children.length ? (
          <Accordion key={category.id}>
            <AccordionHeader
              px="0px"
              py="6px"
              color="text.muted"
              onClick={() => router.push(`/categories/${category.id}`)}
              justifyContent="flex-start"
            >
              {category.image && (
                <Image src={category.image} width="20" height="20" />
              )}
              <SemiSpan className="cursor-pointer" mx="9px">
                <Link href={`/categories/${category.id}`}>
                  {category?.name}
                </Link>
              </SemiSpan>
            </AccordionHeader>
            {category?.children.map((subItem) => (
              <FlexBox
                justifyContent="flex-start"
                my="8px"
                pl="10px"
                key={subItem.id}
              >
                {subItem.image && (
                  <Image src={subItem.image} width="20" height="20" />
                )}
                <Paragraph
                  className="cursor-pointer"
                  fontSize="14px"
                  color="text.muted"
                  key={Math.random()}
                  pl="10px"
                  onClick={() => router.push(`/categories/${subItem.id}`)}
                >
                  {subItem?.name}
                </Paragraph>
              </FlexBox>
            ))}
          </Accordion>
        ) : (
          <FlexBox key={category.id} justifyContent="flex-start" my="8px">
            {category.image && (
              <Image width="20px" height="20px" src={category.image} />
            )}
            <Paragraph
              className="cursor-pointer"
              fontSize="14px"
              color="text.muted"
              key={Math.random()}
              pl="10px"
              onClick={() => router.push(`/categories/${category?.id}`)}
            >
              {category?.name}
            </Paragraph>
          </FlexBox>
        )
      )}
      <Divider mt="18px" mb="24px" />
      {/* <H6 mb="16px">Price Range</H6>
      <FlexBox justifyContent="space-between" alignItems="center">
        <TextField placeholder="0" type="number" fullwidth />
        <H5 color="text.muted" px="0.5rem">
          -
        </H5>
        <TextField placeholder="250" type="number" fullwidth />
      </FlexBox> */}
    </Card>
  );
};

export default ProductFilterCard;
