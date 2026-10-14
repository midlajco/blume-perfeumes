import React from 'react'
import { getProducts } from '../services/ProductService'
import { useQuery } from '@tanstack/react-query';

function Shop() {
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
  return (
    <div>
       <h1>shop</h1>
       <div>
            {
        products.map((product)=>(
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