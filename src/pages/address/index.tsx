import AddressEditor from "@component/address/AddressEditor";
import DashboardLayout from "@component/layout/CustomerDashboardLayout";
import React from "react";

const Address = () => {
  return <AddressEditor />;
};

Address.layout = DashboardLayout;
export default Address;
