import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useUsers } from "../../UserContext";
import UserTable from "../../components/shared/users/UserTable";

function Users() {
  const { users, deleteUser, toggleUserStatus } = useUsers();
  const navigate = useNavigate();

  const handleEdit = (userId) => {
    navigate(`/edit-user/${userId}`);
  };

  return (
    <div className="text-slate-100">
      {/* Page Heading */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-100">
            Users
          </h1>

          <p className="text-slate-400 mt-2">Manage and view your users</p>
        </div>

        {/* Create User Button */}
        <Button
          asChild
          className="bg-indigo-500 hover:bg-indigo-400 text-white rounded-lg transition"
        >
          <Link to="/create-user">+ Create User</Link>
        </Button>
      </div>

      {/* User Table */}
      <UserTable
        users={users}
        onEdit={handleEdit}
        onDelete={deleteUser}
        onStatusChange={toggleUserStatus}
      />
    </div>
  );
}

export default Users;
