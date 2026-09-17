import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Users from "./pages/users/Users";
import Posts from "./pages/Posts";
import Layout from "./components/Layout";
import CreateUser from "./pages/users/CreateUser";
import EditUser from "./pages/users/EditUser";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<Layout />}>

          <Route path="/home" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/create-user" element={<CreateUser />} />
          <Route path="/edit-user/:id" element={<EditUser />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;