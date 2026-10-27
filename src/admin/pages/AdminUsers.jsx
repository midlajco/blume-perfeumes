import { useState } from 'react'
import { deleteUserById, getUsers, updateUserStatus } from '../../services/UserService'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Trash2 } from 'lucide-react';
function AdminUsers() {
  const queryClient =useQueryClient();


 
  const {data:users,isLoading} =useQuery({
    queryFn:getUsers,
    queryKey:["users"],

  })
  const [searchterm,setSearchTerm]=useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  

  const filteredUsers =users?.filter((user)=>user.name.toLowerCase().includes(searchterm.toLocaleLowerCase()) || user.email.toLowerCase().includes(normalizedSearchTerm))
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
  <div className="min-h-[calc(100vh-4rem)] bg-[#f7f2ea] text-[#292824]">
    {/* Page Header */}
    <div className="mb-7 flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
      <h1 className="font-serif text-4xl tracking-tight text-[#201e1a]">
        Users
      </h1>

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#514b44]"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m16 16 4 4" />
          </svg>

          <input
            value={searchterm}
            type="text"
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search users..."
            className="w-full rounded-lg border border-[#ded6cb] bg-[#fbf8f2] py-3 pl-12 pr-4 text-sm outline-none transition focus:border-[#9e8b73] sm:w-80"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="min-w-48 cursor-pointer rounded-lg border border-[#ded6cb] bg-[#fbf8f2] px-4 py-3 text-sm outline-none focus:border-[#9e8b73]"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="blocked">Blocked</option>
        </select>
      </div>
    </div>

    {/* Users Table */}
    <div className="overflow-x-auto rounded-lg border border-[#e5ddd2] bg-[#fbf8f2]">
      {isLoading ? (
        <div className="px-6 py-16 text-center font-serif text-lg text-[#71695e]">
          Loading users...
        </div>
      ) : (
        <table className="w-full min-w-[850px] border-collapse text-left">
          <thead>
            <tr className="border-b border-[#e5ddd2] bg-[#f2ece3]">
              <th className="px-6 py-4 font-serif text-base font-normal">
                Name
              </th>
              <th className="px-6 py-4 font-serif text-base font-normal">
                Email
              </th>
              <th className="px-6 py-4 font-serif text-base font-normal">
                Status
              </th>
              <th className="px-6 py-4 font-serif text-base font-normal">
                Change Status
              </th>
              <th className="px-6 py-4 text-center font-serif text-base font-normal">
                Delete
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers?.map((user) => (
              <tr
                key={user.id}
                className="border-b border-[#e9e1d7] transition-colors last:border-b-0 hover:bg-[#f6f0e7]"
              >
                <td className="whitespace-nowrap px-6 py-3.5 font-serif text-base">
                  {user.name}
                </td>

                <td className="whitespace-nowrap px-6 py-3.5 text-sm text-[#514b44]">
                  {user.email}
                </td>

                <td className="px-6 py-3.5">
                  <span
                    className={`inline-flex min-w-[106px] justify-center rounded-md px-3 py-1.5 text-sm font-medium ${
                      user.status === "blocked"
                        ? "bg-[#f3d7cf] text-[#873c2c]"
                        : "bg-[#e2e6d8] text-[#34482d]"
                    }`}
                  >
                    {user.status === "blocked" ? "Blocked" : "Active"}
                  </span>
                </td>

                <td className="px-6 py-3.5">
                  <button
                    type="button"
                    onClick={() => handleToggleStatus(user)}
                    disabled={statusMutation.isPending}
                    aria-label={`${user.status === "blocked" ? "Unblock" : "Block"} ${user.name}`}
                    className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60 ${
                      user.status === "blocked"
                        ? "bg-green-100 text-green-700 hover:bg-green-200"
                        : "bg-red-100 text-red-700 hover:bg-red-200"
                    }`}
                  >
                    {user.status === "blocked" ? "Unblock" : "Block"}
                  </button>
                </td>

                <td className="px-6 py-3.5 text-center">
                  <button
                    type="button"
                    onClick={() => delerMutation.mutate(user.id)}
                    disabled={delerMutation.isPending}
                    aria-label={`Delete ${user.name}`}
                    className="inline-flex h-10 w-11 items-center justify-center rounded-lg border border-[#e8ded3] text-[#c95142] transition hover:border-[#c95142] hover:bg-[#f8e6e0] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                   <Trash2 size={19} strokeWidth={1.7} />
                     
                  </button>
                </td>
              </tr>
            ))}

            {filteredUsers?.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-16 text-center font-serif text-lg text-[#81796f]"
                >
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>

    {/* Footer */}
    <div className="mt-5 flex flex-col items-start justify-between gap-3 text-sm text-[#71695e] sm:flex-row sm:items-center">
      <p>
        Total users:{" "}
        <span className="font-medium text-[#292824]">
          {filteredUsers?.length ?? 0}
        </span>
      </p>

      <p className="font-serif text-sm">
        User Management
      </p>
    </div>
  </div>
);

}

export default AdminUsers