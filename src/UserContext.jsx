import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "./lib/supabaseClient";

const UserContext = createContext();

function formatUser(user) {
  return {
    id: user.id,
    firstName: user.first_name,
    lastName: user.last_name,
    username: user.username,
    email: user.email,
    image: user.image,
    status: user.status || "active",
    address: {
      city: user.city || "",
    },
  };
}

export function UserProvider({ children }) {
  const [users, setUsers] = useState([]);

  // Get users from Supabase
 async function fetchUsers() {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    console.error("Error fetching users:", error);
    return;
  }

  setUsers(data.map(formatUser));
}

  useEffect(() => {
    fetchUsers();
  }, []);

  // Create a new user
  async function addUser(newUser) {
    const { data, error } = await supabase
      .from("users")
      .insert([
        {
          first_name: newUser.firstName,
          last_name: newUser.lastName,
          username: newUser.username,
          email: newUser.email,
          city: newUser.city,
          status: newUser.status || "active",
          image: newUser.image,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Error creating user:", error);
      return;
    }

    setUsers((currentUsers) => [
  formatUser(data),
  ...currentUsers,
]);
  }

  // Update an existing user
  async function updateUser(updatedUser) {
    const { data, error } = await supabase
      .from("users")
      .update({
        first_name: updatedUser.firstName,
        last_name: updatedUser.lastName,
        email: updatedUser.email,
        city: updatedUser.address?.city,
        username: updatedUser.username,
        status: updatedUser.status || "active",
        image: updatedUser.image,
      })
      .eq("id", updatedUser.id)
      .select()
      .single();

    if (error) {
      console.error("Error updating user:", error);
      return;
    }

    setUsers((currentUsers) =>
  currentUsers.map((user) =>
    user.id === data.id ? formatUser(data) : user
  )
);
  }

  // Delete a user
  async function deleteUser(userId) {
    const { error } = await supabase
      .from("users")
      .delete()
      .eq("id", userId);

    if (error) {
      console.error("Error deleting user:", error);
      return;
    }

    setUsers((currentUsers) =>
      currentUsers.filter(
        (user) => user.id !== userId
      )
    );
  }

  // Toggle user status
  async function toggleUserStatus(userId) {
    const user = users.find(
      (user) => user.id === userId
    );

    if (!user) return;

    const newStatus =
      user.status === "inactive"
        ? "active"
        : "inactive";

    const { data, error } = await supabase
      .from("users")
      .update({
        status: newStatus,
      })
      .eq("id", userId)
      .select()
      .single();

    if (error) {
      console.error("Error changing user status:", error);
      return;
    }

    setUsers((currentUsers) =>
  currentUsers.map((user) =>
    user.id === data.id ? formatUser(data) : user
  )
);
  }

  return (
    <UserContext.Provider
      value={{
        users,
        addUser,
        updateUser,
        deleteUser,
        toggleUserStatus,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUsers() {
  return useContext(UserContext);
}