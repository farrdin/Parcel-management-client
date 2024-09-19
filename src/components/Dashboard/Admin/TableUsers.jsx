import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SelectRole } from "./Modal/SelectRole";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

export function TableUsers({ AllUsers, refetch }) {
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const { data: AllParcels = [] } = useQuery({
    queryKey: ["/parcels"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/parcels`);
      return data;
    },
  });
  const filterParcels = (email) => {
    return AllParcels.filter((parcel) => parcel.email === email);
  };

  const calculatePrice = (parcels) => {
    return parcels.reduce((sum, parcel) => {
      return sum + (parcel.price ? Number(parcel.price) : 0);
    }, 0);
  };
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = AllUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(AllUsers.length / usersPerPage);
  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User Name</TableHead>
            <TableHead>Contact Number</TableHead>
            <TableHead>Total Parcels</TableHead>
            <TableHead>Total Spent</TableHead>
            <TableHead>Modify Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentUsers.map((users) => {
            const userParcels = filterParcels(users.email);
            const totalParcels = userParcels.length;
            const totalSpent = calculatePrice(userParcels);
            return (
              <TableRow key={users._id}>
                <TableCell>{users.name}</TableCell>
                <TableCell>{users.phone}</TableCell>
                <TableCell>{totalParcels}</TableCell>
                <TableCell>{`${totalSpent}TK`}</TableCell>
                <TableCell className="flex">
                  <SelectRole users={users} refetch={refetch} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <div className="flex gap-2 justify-center items-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2"
        >
          <FaArrowLeft className="text-xl text-butL cursor-pointer hover:text-butD" />
        </button>
        <span className="text-sm text-headL font-open font-bold">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2"
        >
          <FaArrowRight className="text-xl text-butL cursor-pointer hover:text-butD" />
        </button>
      </div>
    </div>
  );
}
