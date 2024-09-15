import Chart from "react-apexcharts";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/Hooks/useAxiosSecure";

const LineChart = () => {
  const axiosSecure = useAxiosSecure();
  const { data: parcels = [] } = useQuery({
    queryKey: ["parcels"],
    queryFn: async () => {
      const response = await axiosSecure.get("/parcels");
      return response.data;
    },
  });
  const processData = (parcels, filterByDelivered = false) => {
    return parcels.reduce((acc, parcel) => {
      const date = new Date(parcel.bookingDate).toLocaleDateString();
      if (!acc[date]) {
        acc[date] = 0;
      }
      if (!filterByDelivered || parcel.status === "Delivered") {
        acc[date] += 1;
      }
      return acc;
    }, {});
  };
  const totalParcels = processData(parcels);
  const deliveredParcels = processData(parcels, true);
  const dates = [
    ...new Set([
      ...Object.keys(totalParcels),
      ...Object.keys(deliveredParcels),
    ]),
  ];
  const totalSeries = dates.map((date) => totalParcels[date] || 0);
  const deliveredSeries = dates.map((date) => deliveredParcels[date] || 0);
  const options = {
    chart: {
      height: 350,
      type: "line",
    },
    title: {
      text: `(Total Booked: ${parcels.length})`,
      align: "center",
    },
    xaxis: {
      categories: dates,
      title: {
        text: "Date",
      },
    },
    yaxis: {
      title: {
        text: "Number of Parcels",
      },
    },
    stroke: {
      curve: "smooth",
    },
    legend: {
      position: "top",
    },
  };
  const series = [
    {
      name: "Total Parcels",
      data: totalSeries,
    },
    {
      name: "Delivered Parcels ",
      data: deliveredSeries,
    },
  ];
  return <Chart options={options} series={series} type="line" height={350} />;
};

export default LineChart;
