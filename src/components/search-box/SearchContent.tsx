import FlexBox from "@component/FlexBox";
import NoResults from "@component/NoResults";
import Spinner from "@component/Spinner";
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "apis/products/productsApi";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import useSWR from "swr";
import ProductSearchItem from "./ProductSearchItem";

const Wrapper = styled.div`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  width: 100%;
  /* min-height: 200px; */
  max-height: 480px;
  padding: 12px 0px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
  overflow: auto;
`;

const NoResultWrapper = styled.div``;

const NoQueryWrapper = styled.div``;

interface IProps {
  query: string;
  searchRef: React.RefObject<HTMLFormElement>;
  category: string | null;
  setSearchBoxOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchContent = ({
  query,
  searchRef,
  category,
  setSearchBoxOpen,
}: IProps) => {
  const [products, setProducts] = useState([]);

  const { isRefetching, refetch } = useQuery(
    ["products-search"],
    () => {
      return getAllProducts({
        name: query,
        cat_id: category,
      });
    },
    {
      onSuccess(data) {
        setProducts(data.data.data);
      },
      enabled: false,
    }
  );

  const closeSearchBox = () => {
    setSearchBoxOpen(false);
  };

  const onHideBox = (e: MouseEvent) => {
    if (!searchRef.current) return;

    const isWithin = searchRef.current.contains(e.target as any);

    if (!isWithin) {
      closeSearchBox();
    }
  };

  useEffect(() => {
    if (!query) {
      setProducts([]);
      return;
    }
    const timeout = setTimeout(() => {
      refetch();
    }, 600);
    return () => clearTimeout(timeout);
  }, [query, category]);

  useEffect(() => {
    window.addEventListener("click", onHideBox);
    return () => window.removeEventListener("click", onHideBox);
  }, []);

  return (
    <Wrapper>
      {isRefetching ? (
        <FlexBox alignItems="center" justifyContent="center" p="16px">
          <Spinner />
        </FlexBox>
      ) : !query || products.length === 0 ? (
        <NoResults />
      ) : (
        <>
          {products.map((product) => {
            return (
              <ProductSearchItem
                closeSearchBox={closeSearchBox}
                product={product}
                key={product.id}
              />
            );
          })}
        </>
      )}
    </Wrapper>
  );
};

export default SearchContent;

/**<Wrapper>
      {isRefetching ? (
        <FlexBox alignItems="center" justifyContent="center" p="16px">
          <Spinner />
        </FlexBox>
      ) : !query || products.length === 0 ? (
        <NoResults />
      ) : (
        <>
          {products.map((product) => {
            return <ProductSearchItem product={product} key={product.id} />;
          })}
        </>
      )}
    </Wrapper> */
