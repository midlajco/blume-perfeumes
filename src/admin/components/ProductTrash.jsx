import React from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteProductById, getDeletedProducts, restoreProductById } from '../../services/ProductService';
import { Search, RotateCcw, Trash2 } from "lucide-react";

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
      if (isLoading){
        return  <p className="m-4">Loading deleted products...</p>;
      } 
       if (isError) {
        return (
            <div className="m-4 rounded border border-red-300 bg-red-50 p-4 text-red-700">
                <p>Failed to load deleted products.</p>
                <p>'Something went wrong</p>
                <button
                    className="mt-2 rounded bg-red-600 px-3 py-1 text-white"
                    onClick={() =>
                        queryClient.invalidateQueries({
                            queryKey: ['products', 'trash']
                        })
                    }
                >
                    Try again
                </button>
            </div>
        );
    }
     if (deletedProducts.length === 0) {
        return (
            <div className="m-4 rounded border p-6 text-center">
                <h2 className="text-lg font-semibold">
                    Trash is empty
                </h2>
                <p className="mt-2 text-gray-500">
                    No deleted products found.
                </p>
            </div>
        );
    }
    

    return (
  <div className="min-h-screen bg-[#f8f5ef] p-4 sm:p-6 lg:p-8">
    <div className="mx-auto max-w-7xl space-y-6">

      {/* Header */}
      <div>
        <h1 className="font-serif text-3xl text-[#29251f] sm:text-4xl">
          Trash Products
        </h1>
        <p className="mt-2 text-sm text-[#82796e]">
          Products that have been deleted
        </p>
      </div>

      {/* Search
      <div className="relative">
        <Search
          size={19}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8d8479]"
        />
        <input
          type="text"
          placeholder="Search products..."
          className="w-full rounded-lg border border-[#e2dacf] bg-[#fbf9f5] py-3 pl-11 pr-4 text-sm outline-none focus:border-[#a79782]"
        />
      </div> */}

      {/* Products Table */}
      <div className="overflow-hidden rounded-lg border border-[#e5ddd2] bg-[#fbf9f5]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[650px] border-collapse text-left">
            <thead className="bg-[#f0e9df]">
              <tr className="text-xs uppercase tracking-wide text-[#71675b]">
                <th className="px-6 py-4">#</th>
                <th className="px-6 py-4">Product Name</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#e9e1d7]">
              {deletedProducts.map((product, index) => (
                <tr
                  key={product.id}
                  className="transition-colors hover:bg-[#f6f1e9]"
                >
                  <td className="px-6 py-4 text-sm text-[#82796e]">
                    {index + 1}
                  </td>

                  <td className="px-6 py-4 text-sm font-medium text-[#302b25]">
                    {product.name}
                  </td>

                  <td className="whitespace-nowrap px-6 py-4 text-sm text-[#302b25]">
                    ₹{Number(product.price).toLocaleString("en-IN")}
                  </td>

                  <td className="px-6 py-3">
                    <div className="flex items-center justify-center gap-3">
                      <button
                        onClick={() => restoreMutation.mutate(product.id)}
                        disabled={restoreMutation.isPending}
                        className="inline-flex items-center gap-2 rounded-lg border border-[#d5d2c6] px-4 py-2 text-sm text-[#43533e] transition hover:bg-[#e8ecdf] disabled:opacity-50"
                      >
                        <RotateCcw size={15} />
                        Restore
                      </button>

                      <button
                        onClick={() => deleteMutation.mutate(product.id)}
                        disabled={deleteMutation.isPending}
                        className="inline-flex items-center gap-2 rounded-lg border border-[#eed1ca] bg-[#fbebe7] px-4 py-2 text-sm text-[#a33d32] transition hover:bg-[#f5dcd6] disabled:opacity-50"
                      >
                        <Trash2 size={15} />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {deletedProducts.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center gap-3 text-[#8b8175]">
                      <Trash2 size={30} strokeWidth={1.4} />
                      <p className="text-base font-medium text-[#403930]">
                        Trash is empty
                      </p>
                      <p className="text-sm">
                        No deleted products found.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <div className="text-sm text-[#82796e]">
        Showing {deletedProducts.length} deleted{" "}
        {deletedProducts.length === 1 ? "product" : "products"}
      </div>

    </div>
  </div>
);
}


export default ProductTrash