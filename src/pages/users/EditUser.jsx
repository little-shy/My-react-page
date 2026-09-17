import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useUsers } from "../../UserContext";

function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { users, updateUser } = useUsers();

  // Find the user
  const user = users.find(
    (user) => user.id === Number(id)
  );

  // Form states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");

  // When the user is found, put their data into the form
  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setEmail(user.email || "");
      setCity(user.address?.city || "");
    }
  }, [user]);

  // Still loading users
  if (users.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-400 text-lg">
          Loading user...
        </p>
      </div>
    );
  }

  // User doesn't exist
  if (!user) {
    return (
      <div className="text-center py-20">

        <h1 className="text-3xl font-bold text-red-400">
          User Not Found
        </h1>

        <p className="text-slate-400 mt-2">
          We couldn't find this user.
        </p>

        <Button
          onClick={() => navigate("/users")}
          className="mt-6 bg-indigo-500 hover:bg-indigo-400"
        >
          Back to Users
        </Button>

      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    updateUser({
      ...user,

      firstName,
      lastName,
      email,

      address: {
        ...user.address,
        city,
      },
    });

    navigate("/users");
  };

  return (
    <div className="max-w-2xl mx-auto">

      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-100">
          Edit User
        </h1>

        <p className="text-slate-400 mt-2">
          Update the user's information
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-slate-700 border border-slate-600 rounded-xl p-6 sm:p-8 space-y-6"
      >

        {/* First Name */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            First Name
          </label>

          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-600 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Last Name
          </label>

          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-600 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-600 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
          />
        </div>

        {/* City */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            City
          </label>

          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-600 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4">

          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/users")}
            className="border-slate-500 text-slate-300 hover:bg-slate-600 hover:text-white"
          >
            Cancel
          </Button>

          <Button
            type="submit"
            className="bg-indigo-500 hover:bg-indigo-400 text-white"
          >
            Save Changes
          </Button>

        </div>

      </form>
    </div>
  );
}

export default EditUser;

