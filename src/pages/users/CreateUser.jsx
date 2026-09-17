import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useUsers } from "../../UserContext";

function CreateUser() {
  const navigate = useNavigate();
  const { users, addUser } = useUsers();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    city: "",
  });

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    // Create a new user object
    const newUser = {
      id: Date.now(),
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      username: formData.firstName.toLowerCase(),
      image: "https://dummyjson.com/icon/abc/128",
      city: formData.city,
    };

    // Add the new user to the beginning of the list
    addUser(newUser);

    // Go back to Users page
    navigate("/users");
  }

  return (
    <div className="max-w-2xl mx-auto">

      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-gray-800">
          Create User
        </h1>

        <p className="text-gray-500 mt-2">
          Enter the details of the new user.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-8 border border-purple-100">

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* First Name */}
          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              First Name
            </label>

            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter first name"
              className="w-full px-4 py-3 bg-white text-gray-800 border border-gray-200 rounded-lg placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Last Name
            </label>

            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter last name"
              className="w-full px-4 py-3 bg-white text-gray-800 border border-gray-200 rounded-lg placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              className="w-full px-4 py-3 bg-white text-gray-800 border border-gray-200 rounded-lg placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          {/* City */}
          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              City
            </label>

            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Enter city"
             className="w-full px-4 py-3 bg-white text-gray-800 border border-gray-200 rounded-lg placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">

            <Button type="submit">
              Create User
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/users")}
            >
              Cancel
            </Button>

          </div>

        </form>

      </div>
    </div>
  );
}

export default CreateUser;