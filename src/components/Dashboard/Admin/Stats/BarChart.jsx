import Chart from "react-apexcharts";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/Hooks/useAxiosSecure";

const aggregateParcelsByDate = (parcels) => {
  const dateMap = new Map();
  parcels.forEach((parcel) => {
    const date = parcel.bookingDate;
    if (dateMap.has(date)) {
      dateMap.set(date, dateMap.get(date) + 1);
    } else {
      dateMap.set(date, 1);
    }
  });
  const dates = Array.from(dateMap.keys());
  const counts = Array.from(dateMap.values());
  return { dates, counts };
};

const BarChart = () => {
  const axiosSecure = useAxiosSecure();
  const { data: parcels = [] } = useQuery({
    queryKey: ["parcels"],
    queryFn: async () => {
      const response = await axiosSecure.get("/parcels");
      return response.data;
    },
  });

  const { dates, counts } = aggregateParcelsByDate(parcels);
  const options = {
    chart: {
      type: "bar",
      height: 350,
    },
    xaxis: {
      categories: dates,
    },
    yaxis: {
      title: {
        text: "Number of Booked Parcels",
      },
    },
  };
  const series = [
    {
      name: "Parcels",
      data: counts,
    },
  ];

  return <Chart options={options} series={series} type="bar" height={350} />;
};

export default BarChart;
