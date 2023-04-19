import Card from "@component/Card";
import { useAppSelector } from "@hook/useRedux";
import { useRouter } from "next/router";
import React, { useEffect, useState, useRef } from "react";
import Box from "../Box";
import FlexBox from "../FlexBox";
import Icon from "../icon/Icon";
import Menu from "../Menu";
import MenuItem from "../MenuItem";
import TextField from "../text-field/TextField";
import StyledSearchBox from "./SearchBoxStyle";
import SearchContent from "./SearchContent";
import { v4 as uuidv4 } from "uuid";

export interface SearchBoxProps {}

const AdvancedSearchBox: React.FC<SearchBoxProps> = () => {
  const router = useRouter();

  const searchRef = useRef<HTMLFormElement>(null);

  const [searchBoxOpen, setSearchBoxOpen] = useState(false);

  const nameFromQuery = router.query.name || "";
  const idFromQuery = router.query.cat_id || null;

  const [searchQuery, setSearchQuery] = useState(nameFromQuery);
  const [category, setCategory] = useState({
    name: "Alle Kategori",
    id: idFromQuery,
  });

  const { categories } = useAppSelector((state) => state.categories);

  const handleCategoryChange = (cat: any) => {
    setCategory({
      name: cat.name,
      id: cat.id,
    });
  };

  const hanldeSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push({
      pathname: category.id ? `/categories/${category.id}` : "/categories",
      query: { ...(searchQuery && { name: searchQuery, fetchId: uuidv4() }) },
    });
  };

  useEffect(() => {
    if (nameFromQuery || idFromQuery) {
      setSearchQuery(nameFromQuery);
      setCategory({
        name:
          categories?.find((cat) => +cat.id === +idFromQuery)?.name ||
          "Alle Kategori",
        id: idFromQuery || null,
      });
    }
  }, [router.query, categories]);

  return (
    <form
      ref={searchRef}
      onSubmit={handleSubmit}
      style={{
        width: "100%",
      }}
    >
      <Box position="relative" flex="1 1 0" maxWidth="670px" mx="auto">
        <StyledSearchBox>
          <Icon className="search-icon" size="18px">
            search
          </Icon>
          <TextField
            className="search-field"
            placeholder="Søk"
            onClick={() => setSearchBoxOpen(true)}
            fullwidth
            value={searchQuery}
            onChange={hanldeSearch}
          />
          <Menu
            className="category-dropdown category-dropdown-search"
            direction="right"
            handler={
              <FlexBox className="dropdown-handler" alignItems="center">
                <span>{category.name}</span>
                <Icon variant="small">chevron-down</Icon>
              </FlexBox>
            }
          >
            {[{ name: "Alle Kategori", id: null }, ...categories].map(
              (item) => (
                <MenuItem
                  key={item.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCategoryChange(item);
                  }}
                >
                  {item.name}
                </MenuItem>
              )
            )}
          </Menu>
          {searchBoxOpen ? (
            <SearchContent
              searchRef={searchRef}
              setSearchBoxOpen={setSearchBoxOpen}
              category={category.id as string}
              query={searchQuery as string}
            />
          ) : (
            <></>
          )}
        </StyledSearchBox>
      </Box>
    </form>
  );
};

export default AdvancedSearchBox;
