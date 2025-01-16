// import { BrowserRouter,Routes,Route } from "react-router-dom"
// import Home from "./pages/Home"
// import Profile from "./pages/Profile"
// import About from "./pages/About"
// import SignIn from "./pages/Signin"
// import SignUp from "./pages/Sign"
// import NewUser from "./pages/NewUser"
// import PrivateRoute from "./components/PrivateRoute"
// import Header from "./components/Header"
// import AdminHome from "./pages/AdminHome"
// import EditUser from "./pages/EditUser"
// import AdminSignIn from "./pages/AdminSignIn"
// import AdminPrivate from "./components/AdminPrivate"


// const App = () => {
  
//   return (
//     <>
//     <BrowserRouter>
//     <Header />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/sign-in" element={<SignIn />} />
//         <Route path="/sign-up" element={<SignUp />} />
//         <Route element={<PrivateRoute />} > 
//         <Route path="/profile" element={<Profile />} />
//         </Route>
        
//         <Route path="/admin/signin" element={<AdminSignIn />} />
//         <Route element={<AdminPrivate />} > 
//         <Route path="/admin" element={<AdminHome />} />
//          <Route path="/admin/newuser" element={<NewUser />} />
//         <Route path="/admin/edit" element={<EditUser />} />
//         </Route>
//         {/* <Route path="/admin/logout" element={<Logout />} />   */}
//       </Routes>
//     </BrowserRouter>
//     </>
//   )
// }

// export default App

import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserLayout from "./layout/UserLayout";
import AdminLayout from "./layout/AdminLayout";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import About from "./pages/About";
import SignIn from "./pages/Signin";
import SignUp from "./pages/Sign";
import NewUser from "./pages/NewUser";
import PrivateRoute from "./components/PrivateRoute";
import AdminHome from "./pages/AdminHome";
import EditUser from "./pages/EditUser";
import AdminSignIn from "./pages/AdminSignIn";
import AdminPrivate from "./components/AdminPrivate";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* User Routes with Header */}
        <Route element={<UserLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>

        {/* Admin Routes without Header */}
        <Route element={<AdminLayout />}>
          <Route path="/admin/signin" element={<AdminSignIn />} />
          {/* <Route element={<AdminPrivate />}> */}
            <Route path="/admin" element={<AdminHome />} />
            <Route path="/admin/newuser" element={<NewUser />} />
            <Route path="/admin/edit" element={<EditUser />} />
          {/* </Route> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
