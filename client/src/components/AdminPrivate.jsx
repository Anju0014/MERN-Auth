import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const AdminPrivate = () => {
    const {currentAdmin}=useSelector(state=>state.admin||{})
    console.log(currentAdmin)
  return  currentAdmin ? <Outlet /> :< Navigate to='/admin/signin' />
  
}



export default AdminPrivate