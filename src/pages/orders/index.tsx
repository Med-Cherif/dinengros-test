import CustomerDashboardLayout from "@component/layout/CustomerDashboardLayout";
import CustomerOrderList from "@component/orders/CustomerOrderList";
import { useAppDispatch, useAppSelector } from "@hook/useRedux";
import { getUserOrdersAction } from "features/actions/ordersActions";
import React, { useEffect } from "react";

const Orders = () => {
  const dispatch = useAppDispatch();

  const { userData } = useAppSelector((state) => state.users);

  useEffect(() => {
    if (userData?.id) {
      dispatch(getUserOrdersAction());
    }
  }, []);

  return <CustomerOrderList />;
};

Orders.layout = CustomerDashboardLayout;

export default Orders;
