import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { deleteProductById, getProducts, SoftDeleteProductById } from '../../services/ProductService'
import { Link } from 'react-router-dom';


function AdminProducts() {
  
 const queryClient =useQueryClient();
 
   const {data:products,isLoading,isError} =useQuery({
    queryFn:getProducts,
    queryKey:["products"],
   })
   const SoftdeleteMutation =useMutation({
    mutationFn:(productId)=>SoftDeleteProductById(productId),
    onSuccess:()=>queryClient.invalidateQueries({
      queryKey:["products"]
    })
   })

   return (
   <>
    <Link to="/admin/newProduct" >product</Link>
   <button>new product</button>
    {
      products?.map((product)=>(
        <div key={product.id} className='border m-2 p-2'>
          <h3>{product.name}</h3>
          <h3>{product.price}</h3>
          <button className='bg-red-200' onClick={()=>SoftdeleteMutation.mutate(product.id)}  >delete</button>
        </div>
        

      ))
    }
    <Link to="/admin/trash" >viw terash</Link>
   </>
   )
}

export default AdminProducts