import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useSelector } from 'react-redux'
import { getWishList } from '../services/WishlistService'

function Wishlist() {
  const user =useSelector((state)=>state.auth.user)
    
     

   const{data:wishlist,isLoading,isError} =useQuery({
    queryKey:["wishlist",user?.id],
    queryFn:()=>getWishList(user.id),
    enabled:!!user


   })
  if (isLoading) return <p>Loading wishlist...</p>;

  if (isError) return <p>Failed to load wishlist.</p>;

   const items = wishlist?.items || [];

    if (items.length === 0) {
    return <p className="mt-50 text-center">Your wishlist is empty.</p>;
  }
  return (
    <div className='mt-50' >
      {
        items.map((item)=>(
          <p>
            {item.name}
          </p>
        ))
      }
    </div>
  )
}
export default Wishlist