import React from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteProductById, getDeletedProducts, restoreProductById } from '../../services/ProductService';

function ProductTrash() {

    const queryClient =useQueryClient();
    const { data: deletedProducts = [], isLoading, isError } = useQuery({
        queryKey: ["products", "trash"],
        queryFn: getDeletedProducts,
    });
    const restoreMutation =useMutation({
        mutationFn:(productId)=>restoreProductById(productId),
        onSuccess:()=>queryClient.invalidateQueries({
            queryKey:["products"]
            
        })
    })
     const deleteMutation =useMutation({
        mutationFn:(productId)=>deleteProductById(productId),
        onSuccess:()=>queryClient.invalidateQueries({
          queryKey:["products"]
        })
       })
    

    return (
        <>
        <h1>tarsh products</h1>

            {
                deletedProducts.map((product) => (
                    <div key={product.id} className='border m-2 p-2'>
                        <p>{product.name}</p>
                        <button onClick={()=>restoreMutation.mutate(product.id)} >restore</button>
                        <button onClick={()=>deleteMutation.mutate(product.id)} >delete</button>

                    </div>
                ))
            }
        </>
    )
}


export default ProductTrash