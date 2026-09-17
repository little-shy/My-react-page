import UserDeleteConfirmation from "./user-delete-confirmation";
import UserStatusConfirmation from "./UserStatusConfirmation";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";


function UserTable({ users, onEdit, onDelete, onStatusChange }) {
  const [currentPage, setCurrentPage] = useState(1);

  // User selected for deletion
  const [userToDelete, setUserToDelete] = useState(null);
  const [userToToggle, setUserToToggle] = useState(null);

  const usersPerPage = 5;

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;

  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(users.length / usersPerPage);

  // Open delete confirmation
  const handleDeleteClick = (user) => {
    setUserToDelete(user);
  };
  const handleStatusClick = (user) => {
    setUserToToggle(user);
  };

  // Actually delete the user
  const handleConfirmDelete = () => {
    if (userToDelete) {
      onDelete(userToDelete.id);
      setUserToDelete(null);
    }
  };

  return (
    <div className="bg-slate-700 rounded-xl border border-slate-600 overflow-hidden">
      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          {/* Header */}
          <TableHeader>
            <TableRow className="bg-slate-600 hover:bg-slate-600">
              <TableHead className="text-slate-200 font-semibold">ID</TableHead>

              <TableHead className="text-slate-200 font-semibold">
                User
              </TableHead>

              <TableHead className="text-slate-200 font-semibold">
                Email
              </TableHead>

              <TableHead className="text-slate-200 font-semibold">
                City
              </TableHead>

              <TableHead className="text-slate-200 font-semibold">
                Status
              </TableHead>

              <TableHead className="text-slate-200 font-semibold">
                Edit
              </TableHead>

              <TableHead className="text-slate-200 font-semibold">
                Delete
              </TableHead>
            </TableRow>
          </TableHeader>

          {/* Body */}
          <TableBody>
            {currentUsers.map((user) => (
              <TableRow
                key={user.id}
                className="border-slate-600 hover:bg-slate-600/60 transition"
              >
                {/* ID */}
                <TableCell className="font-semibold text-indigo-300">
                  #{user.id}
                </TableCell>

                {/* User */}
                <TableCell>
                  <div className="flex items-center gap-3">
                    <img
                      src={user.image}
                      alt={user.firstName}
                      className="w-10 h-10 rounded-full border border-slate-500"
                    />

                    <div>
                      <p className="font-semibold text-slate-100">
                        {user.firstName} {user.lastName}
                      </p>

                      <p className="text-sm text-slate-400">
                        {user.username || "newuser"}
                      </p>
                    </div>
                  </div>
                </TableCell>

                {/* Email */}
                <TableCell className="text-slate-300">{user.email}</TableCell>

                {/* City */}
                <TableCell className="text-slate-300">
                  {user.address?.city || "Not provided"}
                </TableCell>

                {/* Status */}
                <TableCell>
                  <button
                    onClick={() => handleStatusClick(user)}
                    className={`px-3 py-1 rounded-full text-sm font-medium border transition ${
                      user.status === "inactive"
                        ? "bg-slate-500/10 text-slate-300 border-slate-500/20 hover:bg-slate-500/20"
                        : "bg-emerald-500/10 text-emerald-300 border-emerald-500/20 hover:bg-emerald-500/20"
                    }`}
                  >
                    {user.status === "inactive" ? "Inactive" : "Active"}
                  </button>
                </TableCell>
                {/* Edit */}
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(user.id)}
                    className="border-slate-500 text-indigo-300 hover:bg-indigo-500 hover:text-white hover:border-indigo-500 transition"
                  >
                    Edit
                  </Button>
                </TableCell>

                {/* Delete */}
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteClick(user)}
                    className="border-slate-500 text-red-300 hover:bg-red-500 hover:text-white hover:border-red-500 transition"
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-5 py-4 bg-slate-800 border-t border-slate-600">
        <p className="text-sm text-slate-400">
          Page{" "}
          <span className="font-semibold text-slate-200">{currentPage}</span> of{" "}
          <span className="font-semibold text-slate-200">{totalPages}</span>
        </p>

        <div className="flex flex-wrap justify-center gap-2">
          {/* Previous */}
          <button
            onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-slate-300 hover:bg-slate-600 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            Previous
          </button>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-3 py-2 rounded-lg font-medium transition ${
                currentPage === index + 1
                  ? "bg-indigo-500 text-white"
                  : "bg-slate-700 border border-slate-600 text-slate-300 hover:bg-slate-600"
              }`}
            >
              {index + 1}
            </button>
          ))}

          {/* Next */}
          <button
            onClick={() =>
              setCurrentPage((page) => Math.min(page + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-slate-300 hover:bg-slate-600 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            Next
          </button>
        </div>
      </div>
      <UserDeleteConfirmation
  user={userToDelete}
  open={!!userToDelete}
  onOpenChange={(open) => {
    if (!open) {
      setUserToDelete(null);
    }
  }}
  onConfirm={handleConfirmDelete}
/>

<UserStatusConfirmation
  user={userToToggle}
  open={!!userToToggle}
  onOpenChange={(open) => {
    if (!open) {
      setUserToToggle(null);
    }
  }}
  onConfirm={() => {
    onStatusChange(userToToggle.id);
    setUserToToggle(null);
  }}
/>
    </div>
  );
}

export default UserTable;
