import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInStart, signInFailure, signInSuccess } from "../redux/admin/adminSlice";

const AdminSignin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { loading, error } = useSelector((state) => state.admin);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signInStart());

    const { email, password } = formData;
    
    // 🔍 Validate Email
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email || !emailPattern.test(email)) {
      dispatch(signInFailure("Please enter a valid email address."));
      return;
    }

    // 🔍 Validate Password (8+ chars, letters, numbers, special chars)
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!password || !passwordPattern.test(password)) {
      dispatch(signInFailure("Password must be at least 8 characters long and include letters, numbers, and special characters."));
      return;
    }

    try {
      const response = await fetch("/api/admin/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Sign-in failed. Please try again.");
      }

      const data = await response.json();

      if (data.success === false) {
        dispatch(signInFailure("Invalid credentials"));
        return;
      }

      dispatch(signInSuccess(data));
      navigate("/admin");

    } catch (error) {
      dispatch(signInFailure(error.message || "Something went wrong"));
    }
  };

  return (
    <>
      <div className="p-3 max-w-lg mx-auto">
        <h1 className="text-3xl text-center text-green-600 font-semibold my-7">Admin Sign In</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {error && <p className="text-red-600 text-center mt-5">{String(error)}</p>}

          <input
            type="email"
            placeholder="Admin Email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="bg-gray-50 p-3 rounded-lg"
          />
          <input
            type="password"
            placeholder="Admin Password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            className="bg-gray-50 p-3 rounded-lg"
          />
          <button disabled={loading} className="bg-green-600 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
            {loading ? "Loading..." : "Sign In"}
          </button>
        </form>
      </div>
    </>
  );
};

export default AdminSignin;
