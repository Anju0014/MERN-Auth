import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
  <>
  <div className="bg-green-600 m-5 text-center h-10 text-xl font-bold text-white">Admin Life</div>
  <Outlet />
  </>
  
)};

export default AdminLayout;
