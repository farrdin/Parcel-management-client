import ReviewCards from "@/components/Dashboard/DeliveryMan/ReviewCards";
import { Helmet } from "react-helmet-async";

const MyReviews = () => {
  return (
    <div>
      <Helmet>
        <title>ParcelPro | Reviews</title>
      </Helmet>
      <ReviewCards />
    </div>
  );
};

export default MyReviews;
