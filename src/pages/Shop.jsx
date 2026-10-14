import React, { useState } from 'react'
import { getProducts } from '../services/ProductService'
import { useQuery } from '@tanstack/react-query';

function Shop() {
  const [searchTerm,setSearchTerm] =useState("");
  const [category,setCategory] =useState("All");
  const [sortBy,setSortBy] =useState("low");

   const {data:products,isLoading,isError} =useQuery({
    queryKey:["products"],
    queryFn:getProducts

   })
   if(isLoading){
    return <p>Loading Products</p>
   }
   if(isError){
    return <p>Failed to Load products</p>
   }
   if(products.length === 0){
    return <p>No Products Available</p>
   }
   const filteredProducts =
            products.filter((product)=>product.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())  )
  return (
    <div className='mt-10' >
       <h1>shop</h1>
       <div className= "mx-auto p-6" >
        <input type="text"
             placeholder='Search....'
             onChange={(e)=>setSearchTerm(e.target.value)}
             value={searchTerm}
             className="w-full p-3 border border-gray-300 rounded-lg
                 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
       </div>
       <div>
            {
        filteredProducts.map((product)=>(
            <div key={product.id} >
                {product.name}
            </div>
        ))
       }
       </div>
       
    </div>
  )
}

export default Shop