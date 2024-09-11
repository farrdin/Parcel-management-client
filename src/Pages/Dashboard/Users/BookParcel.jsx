import { Helmet } from "react-helmet-async";
import welcome from "../../../assets/add-parcel.json";
import Lottie from "lottie-react";
import useAuth from "@/Hooks/useAuth";
import { useForm } from "react-hook-form";
import MapLocation from "@/components/Dashboard/User/MapLocation";
import { useState } from "react";
import {
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Dialog } from "@radix-ui/react-dialog";
import { toast } from "react-toastify";
import mapicon from "../../../assets/map.json";

const BookParcel = () => {
  const { user } = useAuth();
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      name: user.displayName,
      email: user.email,
      latitude: "",
      longitude: "",
    },
  });
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [showMapDialog, setShowMapDialog] = useState(false);
  const handleLocationSelect = (lat, lng) => {
    setLatitude(lat);
    setLongitude(lng);
    setValue("latitude", lat);
    setValue("longitude", lng);
    setShowMapDialog(false);
  };
  const onSubmit = async (data) => {
    // const {
    //   name,
    //   email,
    //   phone,
    //   type,
    //   weight,
    //   address,
    //   reciverName,
    //   reciverNumber,
    //   reqDate,
    //   price,
    // } = data;

    if (!latitude || !longitude) {
      toast.error("Please select a location on the map.");
      return;
    }
    const locationData = {
      ...data,
      latitude,
      longitude,
    };

    console.log(locationData, data);
  };

  return (
    <div>
      <Helmet>
        <title>ParcelPro | Book-Parcels</title>
      </Helmet>
      <div className="md:flex justify-around p-5">
        <Lottie
          loop={false}
          animationData={welcome}
          className="hidden lg:block lg:w-[35%]"
        />
        <div className="w-full lg:w-[50%]">
          <div className="p-8 h-full rounded-md shadow shadow-butL dark:shadow-butD bg-backL bg-opacity-20 dark:bg-backD dark:bg-opacity-65 text-headL dark:text-paraD font-open">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <div className="space-y-4">
                <div className="md:flex  gap-10">
                  <div className="space-y-2 md:w-1/2">
                    <label className="block text-sm text-headL dark:text-headD">
                      Your Name
                    </label>
                    <input
                      {...register("name")}
                      disabled
                      type="text"
                      className="w-full px-3 py-2 border rounded-md dark:border-link dark:bg-gray-50 dark:text-headL focus:dark:border-link"
                    />
                  </div>
                  <div className="space-y-2 md:w-1/2">
                    <label className="block text-sm text-headL dark:text-headD">
                      Email address
                    </label>
                    <input
                      {...register("email")}
                      disabled
                      type="email"
                      className="w-full px-3 py-2 border rounded-md dark:border-link dark:bg-gray-50 dark:text-headL focus:dark:border-link"
                    />
                  </div>
                </div>
                <div className="md:flex gap-10">
                  <div className="space-y-2 md:w-1/2">
                    <label className="block text-sm text-headL dark:text-headD">
                      Your Number
                    </label>
                    <input
                      {...register("phone")}
                      required
                      type="number"
                      placeholder="+880****"
                      className="w-full px-3 py-2 border rounded-md dark:border-link dark:bg-gray-50 dark:text-headL focus:dark:border-link"
                    />
                  </div>
                  <div className="space-y-2 md:w-1/2">
                    <label className="block text-sm text-headL dark:text-headD">
                      Parcel Type
                    </label>
                    <input
                      {...register("type")}
                      required
                      type="text"
                      placeholder=" Type"
                      className="w-full px-3 py-2 border rounded-md dark:border-link dark:bg-gray-50 dark:text-headL focus:dark:border-link"
                    />
                  </div>
                </div>
                <div className="md:flex gap-10">
                  <div className="space-y-2 md:w-1/2">
                    <label className="block text-sm text-headL dark:text-headD">
                      Parcel Weight(kg)
                    </label>
                    <input
                      {...register("weight")}
                      required
                      type="number"
                      placeholder="__kg"
                      className="w-full px-3 py-2 border rounded-md dark:border-link dark:bg-gray-50 dark:text-headL focus:dark:border-link"
                    />
                  </div>
                  <div className="space-y-2 md:w-1/2">
                    <label className="block text-sm text-headL dark:text-headD">
                      Delivery address
                    </label>
                    <input
                      {...register("address")}
                      required
                      type="text"
                      placeholder="Address"
                      className="w-full px-3 py-2 border rounded-md dark:border-link dark:bg-gray-50 dark:text-headL focus:dark:border-link"
                    />
                  </div>
                </div>
                <div className="md:flex gap-10">
                  <div className="space-y-2 md:w-1/2">
                    <label className="block text-sm text-headL dark:text-headD">
                      Reciver Name
                    </label>
                    <input
                      {...register("reciverName")}
                      required
                      type="text"
                      placeholder="Reciver's Name"
                      className="w-full px-3 py-2 border rounded-md dark:border-link dark:bg-gray-50 dark:text-headL focus:dark:border-link"
                    />
                  </div>
                  <div className="space-y-2 md:w-1/2">
                    <label className="block text-sm text-headL dark:text-headD">
                      Reciver Number
                    </label>
                    <input
                      {...register("reciverNumber")}
                      required
                      type="number"
                      placeholder="+880****"
                      className="w-full px-3 py-2 border rounded-md dark:border-link dark:bg-gray-50 dark:text-headL focus:dark:border-link"
                    />
                  </div>
                </div>
                <div className="md:flex items-center gap-10">
                  <div className="space-y-2 md:w-1/2">
                    <label className="block text-sm text-headL dark:text-headD">
                      Req* Delivery Date
                    </label>
                    <input
                      {...register("reqDate")}
                      required
                      type="date"
                      className="w-full px-3 py-1 border rounded-md dark:border-link dark:bg-gray-50 dark:text-headL focus:dark:border-link"
                    />
                  </div>
                  <div className="space-y-2 md:w-1/2">
                    <label className="block text-sm text-headL dark:text-headD">
                      Price*
                    </label>
                    <input
                      {...register("price")}
                      required
                      type="number"
                      placeholder="Parcel Price"
                      className="w-full px-3 py-2 border rounded-md dark:border-link dark:bg-gray-50 dark:text-headL focus:dark:border-link"
                    />
                  </div>
                </div>
                <div className="flex justify-center">
                  <Dialog open={showMapDialog} onOpenChange={setShowMapDialog}>
                    <DialogTrigger asChild>
                      <Lottie
                        loop={true}
                        animationData={mapicon}
                        className=" w-[180px] mt-3"
                      />
                    </DialogTrigger>
                    <DialogContent
                      style={{ width: "100vw", maxWidth: "850px" }}
                    >
                      <DialogTitle>Select a location on the map</DialogTitle>

                      <MapLocation
                        latitude={latitude}
                        longitude={longitude}
                        setLatitude={setLatitude}
                        setLongitude={setLongitude}
                        onLocationSelect={handleLocationSelect}
                      />
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              <button className="bg-butL dark:bg-butD hover:bg-butD hover:dark:bg-butL text-paraD dark:text-headL hover:dark:text-paraD hover:text-headL w-full px-8 py-3 font-semibold rounded-md">
                Book For Parcel
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookParcel;
