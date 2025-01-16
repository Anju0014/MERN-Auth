import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { LogOut } from "../redux/admin/adminSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminHome = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch=useDispatch();
  const navigate=useNavigate();
  
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/admin/getUsers");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/admin/search?sename=${searchTerm}`);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error searching users:", error);
    }
  };

  
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await fetch(`/api/admin/delete?id=${id}`, { method: "DELETE" });
        fetchUsers(); 
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };
//   const handleLogout=async ()=>{
//     try{
//         console.log("ho")
//        await fetch('/api/admin/logout');
//        console.log("hi")
//        dispatch(LogOut());
//     }catch(error){
//        console.log(error)
//     }
//   }

const handleLogout = async () => {
    try {
      console.log("Logging out...");
      const response = await fetch('/api/admin/logout', { method: 'POST' });
      const data = await response.json();
      console.log(data);  // Log the response from the server
      if (response.ok) {
        console.log("Logout successful");
        dispatch(LogOut());
        navigate('/admin/signin')  // Clear state on successful logout
      } else {
        console.error("Logout failed:", data.message || "Unknown error");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-green-700 text-center mb-6">Admin Home</h1>

      {/* Add User & Logout Buttons */}
      <div className="flex justify-center gap-6 mb-6">
        <Link to="/admin/newuser" className="px-4 py-2 bg-green-600 text-white rounded-md shadow-md hover:bg-green-700 transition">Add New User</Link>
        <button onClick={handleLogout} className="px-4 py-2 bg-red-600 text-white rounded-md shadow-md hover:bg-red-700 transition">Logout</button>
      </div>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="flex justify-center items-center mb-6">
        <input
          className="border border-green-500 rounded-md px-4 py-2 w-1/2 focus:outline-none focus:ring-2 focus:ring-green-500"
          type="search"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="ml-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition">Search</button>
      </form>

      {/* User Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-green-600">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Edit</th>
              <th className="py-2 px-4">Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id} className="border-b border-green-400 text-center">
                  <td className="py-2 px-4">{user.username}</td>
                  <td className="py-2 px-4">{user.email}</td>
                  <td className="py-2 px-4">
                    <Link to={`/admin/edit?id=${user._id}`} className="text-blue-500 hover:underline">
                      <i className="fa-regular fa-pen-to-square"></i> Edit
                    </Link>
                  </td>
                  <td className="py-2 px-4">
                    <button onClick={() => handleDelete(user._id)} className="text-red-500 hover:underline">
                      <i className="fa-solid fa-trash"></i> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-600">No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminHome;

