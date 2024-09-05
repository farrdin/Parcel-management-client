import AppUserStat from "@/components/HomeSection/AppUserStat";
import Feature from "@/components/HomeSection/Feature";
import TopDeliveryMan from "@/components/HomeSection/TopDeliveryMan";
import { Helmet } from "react-helmet-async";

function Home() {
  return (
    <div className="space-y-20 my-10">
      <Helmet>
        <title>ParcelPro | Home</title>
      </Helmet>
      <div>
        <Feature></Feature>
      </div>
      <div>
        <AppUserStat></AppUserStat>
      </div>
      <div>
        <TopDeliveryMan></TopDeliveryMan>
      </div>
    </div>
  );
}

export default Home;
