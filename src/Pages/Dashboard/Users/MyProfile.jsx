import UpdateProfile from "@/components/Dashboard/User/Modal/UpdateProfile";
import Spinner from "@/components/shared/Spinner";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useAuth from "@/Hooks/useAuth";
import useRole from "@/Hooks/useRole";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

const Profile = () => {
  const { user, loading } = useAuth() || {};
  const [role, isLoading] = useRole();
  const [updateProfileOpen, setupdateProfileOpen] = useState(false);
  const openUpdateProfile = () => setupdateProfileOpen(true);
  const closeUpdateProfile = () => setupdateProfileOpen(false);

  if (isLoading || loading) return <Spinner />;
  return (
    <div className="flex justify-center items-center h-screen">
      <Helmet>
        <title>ParcelPro | Profile</title>
      </Helmet>
      <div className="bg-white shadow-lg rounded-2xl w-3/5">
        <img
          alt="profile"
          src="https://wallpapercave.com/wp/wp10784415.jpg"
          className="w-full mb-4 rounded-t-lg h-36"
        />
        <div className="flex flex-col items-center justify-center p-4 -mt-16">
          <a href="#" className="relative block">
            <img
              alt="profile"
              src={user?.photoURL}
              className="mx-auto object-cover rounded-full h-24 w-24  border-2 border-white "
            />
          </a>

          <p className="p-2 uppercase px-4 text-xs text-white bg-pink-500 rounded-full">
            {role}
          </p>
          <p className="mt-2 text-xl font-medium text-gray-800 ">
            User Id: {user?.uid}
          </p>
          <div className="w-full p-2 mt-4 rounded-lg">
            <div className="flex flex-wrap items-center justify-between text-sm text-gray-600 ">
              <p className="flex flex-col">
                Name
                <span className="font-bold text-black ">
                  {user?.displayName}
                </span>
              </p>
              <p className="flex flex-col">
                Email
                <span className="font-bold text-black ">{user?.email}</span>
              </p>

              <div>
                <button
                  onClick={() => openUpdateProfile()}
                  className="bg-butL hover:bg-butD  text-headL px-10 py-3 rounded-lg  cursor-pointer  block"
                >
                  Update Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Dialogue For UpdatePofile */}
      <Dialog open={updateProfileOpen} onOpenChange={setupdateProfileOpen}>
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent
          style={{
            width: "100vw",
            maxWidth: "500px",
            maxHeight: "480px",
            height: "100vh",
            overflowY: "auto",
          }}
        >
          <DialogTitle>Update Your Profile</DialogTitle>
          <UpdateProfile closeUpdateProfile={closeUpdateProfile} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Profile;
