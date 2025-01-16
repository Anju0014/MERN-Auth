// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";

// const EditUser = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const userId = new URLSearchParams(location.search).get("id");

//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");

//   useEffect(() => {
//     fetchUserDetails();
//   }, []);

//   const fetchUserDetails = async () => {
//     try {
//       const response = await fetch(`/api/admin/getUser?id=${userId}`);
//       const data = await response.json();
//       setUsername(data.username);
//       setEmail(data.email);
//     } catch (error) {
//       console.error("Error fetching user details:", error);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch(`/api/admin/updateUser?id=${userId}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ username, email }),
//       });
//       if (response.ok) {
//         navigate("/admin");
//       } else {
//         console.error("Error updating user");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   return (
//     <div className="container mx-auto p-6">
//       <h1 className="text-3xl font-bold text-green-700 text-center mb-6">Edit User</h1>
//       <form onSubmit={handleSubmit} className="max-w-md mx-auto">
//         <input
//           type="text"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           className="block w-full border border-green-500 px-4 py-2 rounded-md mb-4"
//           required
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="block w-full border border-green-500 px-4 py-2 rounded-md mb-4"
//           required
//         />
//         <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700">Update User</button>
//       </form>
//     </div>
//   );
// };

// export default EditUser;

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const EditUser = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userId = new URLSearchParams(location.search).get("id");

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!userId) {
      setError("User ID is missing");
      setLoading(false);
      return;
    }
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
        const response = await fetch(`/api/admin/getUserDetails/${userId}`); // Correct URL format
        if (!response.ok) {
          throw new Error("Failed to fetch user details");
        }
        const data = await response.json();
        setUsername(data.username);
        setEmail(data.email);
      } catch (error) {
        setError("Error fetching user details: " + error.message);
      } finally {
        setLoading(false);
      }
      
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // 🔍 Validate Username (Minimum 3 characters)
    if (username.trim().length < 3) {
      setError("Username must be at least 3 characters long.");
      return;
    }
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
  
    try {
      const response = await fetch(`/api/admin/updateUserDetails/${userId}`, { // ✅ Corrected API route
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email }),
      });
  
      if (!response.ok) {
        throw new Error("Error updating user");
      }
  
      navigate("/admin");
    } catch (error) {
      setError(error.message);
    }
  };
  

  if (loading) {
    return <p className="text-center text-green-700">Loading...</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-green-700 text-center mb-6">Edit User</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="block w-full border border-green-500 px-4 py-2 rounded-md mb-4"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full border border-green-500 px-4 py-2 rounded-md mb-4"
          required
        />
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700">
          Update User
        </button>
      </form>
    </div>
  );
};

export default EditUser;

