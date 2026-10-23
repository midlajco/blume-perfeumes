import React, { useState } from 'react'
import { deleteUserById, getUsers, updateUserStatus } from '../../services/UserService'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

function AdminUsers() {
  const queryClient =useQueryClient();


 
  const {data:users,isLoading} =useQuery({
    queryFn:getUsers,
    queryKey:["users"],

  })
  const [searchterm,setSearchTerm]=useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  
  const filteredUsers =users?.filter((user)=>user.name.toLowerCase().includes(searchterm) || user.email.toLowerCase().includes(searchterm))
                            .filter((user)=>statusFilter==="all" || user.status ===statusFilter)

  const delerMutation =useMutation({
    mutationFn:(userId)=>deleteUserById(userId),
    onSuccess:()=>{
      queryClient.invalidateQueries({
        queryKey:["users"]
      })
    }
  })
  const statusMutation =useMutation({
    mutationFn:({id,status})=>updateUserStatus(id,status),
    onSuccess:()=>queryClient.invalidateQueries({
      queryKey:["users"]
    })
  })

     const handleToggleStatus =(user)=>{
      const newStatus =  user.status === "blocked"?"active":"blocked"
      statusMutation.mutate({id:user.id,status:newStatus})
     }



  
     
  
  console.log(users)

  return (
    <div>
      
        <p>total Users :{users?.length}</p>
        <input value={searchterm}  type="text" onChange={(e)=>setSearchTerm(e.target.value)}  className='border' />
        <select value={statusFilter}  onChange={(e)=>setStatusFilter(e.target.value)}>
          <option value="all">All Users</option>
          <option value="active">Active</option>
          <option value="blocked">blocked</option>
        </select>

        {
          filteredUsers?.map((user)=>(
            <div key={user.id}  className='border m-5'>
              <p>{user.name}</p>
              <p>{user.status}</p>
              <button onClick={()=>delerMutation.mutate(user.id)}  >delete</button>
              <br />
              <button onClick={()=>handleToggleStatus(user)} >{ user.status === "blocked" ? "Unblock": "Block"}</button>
            </div>
          ))
        }
        
      
    </div>

  )
}

export default AdminUsers