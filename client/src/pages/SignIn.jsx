import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom';
import { signInStart,signInFailure,signInSuccess } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import OAuth from '../components/OAuth';

const Signin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const {loading,error}=useSelector((state)=>state.user)
  // const [error,setError]=useState('');
  // const [loading,setLoading]=useState(false)
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signInStart())
     
    const { email, password } = formData;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email || !emailPattern.test(email)) {
      dispatch(signInFailure("Please enter a valid email address."));
      return;
    }
  

    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!password || !passwordPattern.test(password)) {
      dispatch(signInFailure("Password must be at least 8 characters long and include letters, numbers, and special characters."));
      return;
    }
    try {
      
    
      const response = await fetch("/api/auth/signin", {
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
      
      // setLoading(false);
      // setError("");  
      if(data.success===false){
        dispatch(signInFailure())
        return;
      }
      dispatch(signInSuccess(data))
      navigate('/')
  
    } catch (error) {
      // console.error("Error:", error.message);
      // setLoading(false);
      // setError(error.message);  
      dispatch(signInFailure(error))
    }
  };
  
  return (
    <>
      <div className="p-3 max-w-lg mx-auto">
        <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <p className='text-red-600  text-center mt-5'>{error? error ||'Something went wrong!': ''}</p>
        
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
            {loading? 'Loading...': 'Sign In' }
          </button>
          <OAuth />
        </form>
        <div className="flex gap-2 mt-5">
          <p> Dont Have an Account</p>
          <Link to="/sign-up">
            <span className="text-blue-500">Sign Up</span>
          </Link>
        </div>
      </div>
    </>
  //  <div>Signin</div>
  )
}


export default Signin



