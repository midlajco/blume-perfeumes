import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../redux/authSlice';

function AdminProfile() {
    const user =useSelector((state)=>state.auth.user)
    const dispatch =useDispatch();
  return (
    <div>
        <h1>welcome</h1>
        <h1>{user?.name}</h1>
        <button onClick={()=>dispatch(logout())} >logout</button>

    </div>
  )
}

export default AdminProfile