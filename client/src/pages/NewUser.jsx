// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const NewUser = () => {
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password,setPassword]=useState("")
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch("/api/admin/addUser", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ username, email }),
//       });
//       if (response.ok) {
//         navigate("/admin");
//       } else {
//         console.error("Error adding user");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   return (
//     <div className="container mx-auto p-6">
//       <h1 className="text-3xl font-bold text-green-700 text-center mb-6">Add New User</h1>
//       <form onSubmit={handleSubmit} className="max-w-md mx-auto">
//         <p className="text-red-500">{error}</p>
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
//          <input
//           type="password"
//           placeholder="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="block w-full border border-green-500 px-4 py-2 rounded-md mb-4"
//           required
//         />
//         <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700">Add User</button>
//       </form>
//     </div>
//   );
// };

// export default NewUser;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const NewUser = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // 🔹 Error state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // 🔹 Reset error before validation

    // 🔍 **Validation Checks**
    if (!username || !email || !password) {
      setError("All fields are required.");
      return;
    }

    // 🔍 Validate Username
    if (username.trim().length < 3) {
      setError("Username must be at least 3 characters long.");
      return;
    }

    // 🔍 Validate Email
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // 🔍 Validate Password
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!passwordPattern.test(password)) {
      setError("Password must be at least 8 characters long and include letters, numbers, and special characters.");
      return;
    }

    // ✅ **Submit Data if Validation Passes**
    try {
      const response = await fetch("/api/admin/addUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        navigate("/admin"); // ✅ Redirect after successful submission
      } else {
        setError("Error adding user. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Something went wrong. Please try again later.");
    }
  };  

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-green-700 text-center mb-6">Add New User</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">

        {/* 🔹 Display Error Message */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

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
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block w-full border border-green-500 px-4 py-2 rounded-md mb-4"
          required
        />
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700">
          Add User
        </button>
      </form>
    </div>
  );
};

export default NewUser;
