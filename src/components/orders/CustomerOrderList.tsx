import { usePagination } from "@hook/usePagination";
import usePaginationData from "@hook/usePaginationData";
import { useAppSelector } from "@hook/useRedux";
import { stat } from "fs";
import React, { useState } from "react";
import FlexBox from "../FlexBox";
import Hidden from "../hidden/Hidden";
import DashboardPageHeader from "../layout/DashboardPageHeader";
import Pagination from "../pagination/Pagination";
import TableRow from "../TableRow";
import { H5 } from "../Typography";
import OrderRow from "./OrderRow";

export interface CustomerOrderListProps {}

// const PER_PAGE = 5;

const CustomerOrderList: React.FC<CustomerOrderListProps> = () => {
  const { orders } = useAppSelector((state) => state.orders);

  const [page, setPage] = useState(1);

  const { totalPages, list } = usePaginationData({
    data: orders,
    page,
  });

  return (
    <div>
      <DashboardPageHeader title="Min ordre" iconName="bag_filled" />

      <Hidden down={769}>
        <TableRow padding="0px 18px" boxShadow="none" bg="none">
          <H5 color="text.muted" my="0px" mx="6px" textAlign="left">
            Type
          </H5>
          <H5 color="text.muted" my="0px" mx="6px" textAlign="left">
            Status
          </H5>
          <H5 color="text.muted" my="0px" mx="6px" textAlign="left">
            Kjøpt Dato
          </H5>

          <H5 color="text.muted" my="0px" mx="6px" textAlign="left">
            Leveringsdato
          </H5>

          <H5 color="text.muted" my="0px" mx="6px" textAlign="left">
            Total
          </H5>
        </TableRow>
      </Hidden>

      <div style={{ minHeight: "250px" }}>
        {list.map((item) => (
          <OrderRow order={item} key={item.id} />
        ))}
      </div>

      <FlexBox justifyContent="center" mt="2.5rem">
        <Pagination
          currentPage={page}
          pageCount={totalPages}
          onChange={(page) => {
            setPage(page);
          }}
        />
      </FlexBox>
    </div>
  );
};

export default CustomerOrderList;
