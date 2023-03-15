import Featured from "@component/home-1/Featured";
import NewArrivals from "@component/home-1/NewArrivals";
import Offers from "@component/home-1/Offers";
import Section1 from "../components/home-1/Section1";
import AppLayout from "../components/layout/AppLayout";

const IndexPage = () => {
  return (
    <>
      <main>
        <Section1 />
        <Offers />
        <Featured />
        <NewArrivals />
      </main>
    </>
  );
};

IndexPage.layout = AppLayout;

export default IndexPage;
