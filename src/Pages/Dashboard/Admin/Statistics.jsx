import BarChart from "@/components/Dashboard/Admin/Stats/BarChart";
import LineChart from "@/components/Dashboard/Admin/Stats/LineChart";
import { Helmet } from "react-helmet-async";

const Statistics = () => {
  return (
    <div className="space-y-5">
      <Helmet>
        <title>ParcelPro | Statistics</title>
      </Helmet>
      <div>
        <h2 className="text-xl text-headD font-open font-semibold text-center">
          Parcel Booked by Date
        </h2>
        <BarChart />
      </div>
      <div>
        <h2 className="text-xl text-headD font-open font-semibold text-center">
          Booked Parcels VS Delivered Parcels
        </h2>
        <LineChart />
      </div>
    </div>
  );
};

export default Statistics;
