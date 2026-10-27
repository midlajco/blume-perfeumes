import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import { deleteProductById, getProducts, SoftDeleteProductById } from '../../services/ProductService'
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from "lucide-react";

function AdminProducts() {

  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");

  const { data: products, isLoading, isError, isFetching } = useQuery({
    queryFn: getProducts,
    queryKey: ["products", ],
  })


  const SoftdeleteMutation = useMutation({
    mutationFn: (productId) => SoftDeleteProductById(productId),
    onSuccess: () => queryClient.invalidateQueries({
      queryKey: ["products"]
    })
  })

  const filteredProducts = products?.filter((product) => product.isDeleted == false).
  filter((product) => product.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())).
    filter((product) => category === "All" || product.category === category);

  const totalPages = Math.max(1, Math.ceil(filteredProducts?.length / limit));
  const startIndex = (currentPage - 1) * limit;

  const paginatedProducts = filteredProducts?.slice(
    startIndex,
    startIndex + limit
  );



  return (
    <div className="min-h-screen bg-[#f7f3ed] p-6 text-[#292724]">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif">Products</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your fragrances
          </p>
        </div>

        <button onClick={() => navigate("/admin/newProduct")} >
          + Add Product
        </button>
      </div>

      <div className="mb-4 flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {setSearchTerm(e.target.value)  ; setCurrentPage(1); }    }
          placeholder="Search products..."
          className="w-full rounded border border-[#e3ddd4] bg-[#fcfaf7] px-4 py-3 text-sm outline-none focus:border-gray-400"
        />

        <select
          id="category-filter"
          value={category}
          onChange={(e) => {setCategory(e.target.value)  ;  setCurrentPage(1); }}
          className="rounded border border-[#e3ddd4] bg-[#fcfaf7] px-4 py-3 text-sm outline-none sm:w-48"
        >
          <option value="All">All Categories</option>
          <option value="Fresh">Fresh</option>
          <option value="Floral">Floral</option>
          <option value="Amber">Amber</option>
          <option value="Musk">Musk</option>
          <option value="Woody">Woody</option>
        </select>
      </div>

      <div className="overflow-x-auto rounded-lg border border-[#e8e1d8] bg-[#fcfaf7]">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-[#e8e1d8] text-gray-600">
              <th className="px-5 py-4 font-medium">Image</th>
              <th className="px-5 py-4 font-medium">Name</th>
              <th className="px-5 py-4 font-medium">Category</th>
              <th className="px-5 py-4 font-medium">Price</th>
              <th className="px-5 py-4 text-center font-medium">Actions</th>
            </tr>
          </thead>

          <tbody>
            {paginatedProducts?.map((product) => (
              <tr
                key={product.id}
                className="border-b border-[#eee8e0] transition hover:bg-[#f5f0e9] last:border-b-0"
              >
                <td className="px-5 py-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded bg-[#eee5d9]">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full rounded object-cover"
                      />
                    ) : (
                      <span className="text-xl">🧴</span>
                    )}
                  </div>
                </td>

                <td className="whitespace-nowrap px-5 py-3 font-medium">
                  {product.name}
                </td>

                <td className="px-5 py-3 text-gray-600">
                  {product.category || "-"}
                </td>

                <td className="whitespace-nowrap px-5 py-3">
                  ₹{Number(product.price).toLocaleString("en-IN")}
                </td>

                <td className="px-5 py-3">
                  <div className="flex items-center justify-center gap-5">
                    <button
                      onClick={() =>
                        navigate(`/admin/editProduct/${product.id}`)
                      }
                      className="text-gray-700 transition hover:text-black"
                      title="Edit product"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="17"
                        height="17"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 20h9" />
                        <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L8 18l-4 1 1-4Z" />
                      </svg>
                    </button>

                    <button
                      onClick={() =>
                        SoftdeleteMutation.mutate(product.id)
                      }
                      className="text-red-600 transition hover:text-red-800"
                      title="Delete product"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="17"
                        height="17"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M3 6h18" />
                        <path d="M8 6V4h8v2" />
                        <path d="m19 6-1 14H6L5 6" />
                        <path d="M10 11v5M14 11v5" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>




        {isLoading && (
          <p className="p-6 text-center text-sm text-gray-500">
            Loading products...
          </p>
        )}

        {isError && (
          <p className="p-6 text-center text-sm text-red-600">
            Failed to load products.
          </p>
        )}

        {!isLoading && !isError && filteredProducts?.length === 0 && (
          <p className="p-6 text-center text-sm text-gray-500">
            No products found.
          </p>
        )}
      </div>

      <div className="mt-5 flex items-center justify-center gap-4">
        <button
          onClick={() => setCurrentPage((page) => page - 1)}
          disabled={currentPage === 1 || isFetching}
          aria-label="Previous page"
          className="rounded border border-[#e3ddd4] p-2 hover:bg-[#eee5d9] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft size={20} />
        </button>

        <span className="text-sm text-gray-600">
          {currentPage} / {totalPages}
        </span>

        <button
          onClick={() => setCurrentPage((page) => page + 1)}
          disabled={currentPage >= totalPages || isFetching}
          aria-label="Next page"
          className="rounded border border-[#e3ddd4] p-2 hover:bg-[#eee5d9] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronRight size={20} />
        </button>
      </div>


      <div className="mt-5 flex justify-end">
        <Link
          to="/admin/trash"
          className="text-sm text-gray-600 underline decoration-[#c9bfb2] underline-offset-4 transition hover:text-black"
        >
          View Trash
        </Link>
      </div>
    </div>
  );
}

export default AdminProducts