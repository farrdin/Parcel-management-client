import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "@/components/ui/select";
import { IoIosNotifications } from "react-icons/io";
import useAuth from "@/Hooks/useAuth";
import { toast } from "react-toastify";
import useAxiosSecure from "@/Hooks/useAxiosSecure";

export function SelectRole({ users, refetch }) {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [selectedRole, setSelectedRole] = useState(users.role);
  const handleChangeRole = async (value) => {
    setSelectedRole(value);
    try {
      await axiosSecure.patch(`/users/update/${users._id}`, { role: value });
      toast.success("Role updated successfully!");
      refetch();
    } catch (error) {
      console.error("Error updating role:", error);
      toast.error("Failed to update role.");
    }
  };

  if (user.email === users.email) {
    return <h1 className="ml-6 text-green-500 font-open font-bold">Admin</h1>;
  }
  return (
    <Select value={selectedRole} onValueChange={handleChangeRole}>
      <SelectTrigger className="w-[110px] justify-center text-xs text-headD font-open font-semibold">
        <div className="flex items-center">
          {selectedRole}
          {selectedRole !== "deliveryMan" &&
            selectedRole !== "admin" &&
            users.requested === "deliveryMan" && (
              <IoIosNotifications className="ml-1 text-green-500" />
            )}
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Change Role</SelectLabel>
          {selectedRole !== "admin" && (
            <SelectItem value="admin">Admin</SelectItem>
          )}
          {selectedRole !== "deliveryMan" && (
            <SelectItem value="deliveryMan">DeliveryMan</SelectItem>
          )}
          {selectedRole !== "user" && (
            <SelectItem value="user">User</SelectItem>
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
