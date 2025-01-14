
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Sign = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error,setError]=useState('');
  const [loading,setLoading]=useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.username || !formData.email || !formData.password) {
//       alert('All fields are required');
//       return;
//     }

//     try {
//         setLoading(true);
//       const response = await fetch('/api/auth', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       if (!response.ok) {
//         const errorData = await response.text();
//         throw new Error(`Server Error: ${errorData}`);
//       }

//       const data = await response.json();
//       setLoading(false);
//       setError(false);
//     //   console.log(data);
      
//     //   if (data.success) {
//     //     alert('Signup successful!');
//     //     window.location.href = '/sign-in';
//     //   }
//     } catch (error) {
//       console.error('Error:', error.message);
//       setLoading(false);
//       setError(error.message);
//     }
//   };

const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");  // Reset error before submitting
  
    if (!formData.username || !formData.email || !formData.password) {
      setError("All fields are required");
      return;
    }
  
    try {
      setLoading(true);
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Signup failed. Please try again.");
      }
  
      const data = await response.json();
      setLoading(false);
      setError("");  // Clear any previous errors
  
    } catch (error) {
      console.error("Error:", error.message);
      setLoading(false);
      setError(error.message);  // Set the actual error message
    }
  };
  
  return (
    <>
      <div className="p-3 max-w-lg mx-auto">
        <h1 className="text-3xl text-center font-semibold my-7">SignUp</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <p className='text-red-600  text-center mt-5'>{error}</p>
          <input
            type="text"
            placeholder="Username"
            id="username"
            value={formData.username}
            onChange={handleChange}
            className="bg-red-50 p-3 rounded-lg"
          />
          <input
            type="email"
            placeholder="Email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="bg-red-50 p-3 rounded-lg"
          />
          <input
            type="password"
            placeholder="Password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            className="bg-red-50 p-3 rounded-lg"
          />
         <button disabled={loading}className="bg-red-400 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
            {loading? 'Loading...': 'Sign Up' }
          </button>
        </form>
        <div className="flex gap-2 mt-5">
          <p>Have an Account</p>
          <Link to="/sign-in">
            <span className="text-blue-500">Sign In</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Sign;
