
import React, { useEffect, useState } from "react";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  createProduct,
  getProductById,
  updateProductById,
} from "../../services/ProductService";

const emptyProduct = {
  name: "",
  category: "",
  description: "",
  price: "",
  stock: "",
  image: "",
};

function NewProduct() {
  const { id } = useParams();
  const isEditing = Boolean(id);

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [product, setProduct] = useState(emptyProduct);
  const [formError, setFormError] = useState("");

  // Fetch the product only when editing.
  const {
    data: existingProduct,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products", id],
    queryFn: () => getProductById(id),
    enabled: isEditing,
  });

  // Fill the form with existing product details.
  useEffect(() => {
    if (existingProduct) {
      setProduct({
        name: existingProduct.name ?? "",
        category: existingProduct.category ?? "",
        description: existingProduct.description ?? "",
        price: existingProduct.price ?? "",
        stock: existingProduct.stock ?? "",
        image: existingProduct.image ?? "",
      });
    }
  }, [existingProduct]);

  // Create or update using the same mutation.
  const productMutation = useMutation({
    mutationFn: (productData) => {
      if (isEditing) {
        return updateProductById(id, productData);
      }

      return createProduct({
        ...productData,
        isDeleted: false,
      });
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["products"],
      });

      navigate("/admin/products");
    },

    onError: () => {
      setFormError("Unable to save the product. Please try again.");
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProduct((previousProduct) => ({
      ...previousProduct,
      [name]: value,
    }));

    setFormError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    const price = Number(product.price);
    const stock = Number(product.stock);

    if (!Number.isFinite(price) || price < 0) {
      setFormError("Enter a valid, non-negative price.");
      return;
    }

    if (
      product.stock === "" ||
      !Number.isInteger(stock) ||
      stock < 0
    ) {
      setFormError("Stock must be a non-negative whole number.");
      return;
    }

    const productData = {
      ...product,
      price,
      stock,
    };

    productMutation.mutate(productData);
  };

  if (isEditing && isLoading) {
    return <p>Loading product...</p>;
  }

  if (isEditing && isError) {
    return (
      <div>
        <p>Failed to load the product.</p>
        <Link to="/admin/products">Back to products</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-2 text-3xl font-semibold">
        {isEditing ? "Edit Product" : "Add New Product"}
      </h1>

      <p className="mb-6 text-sm text-gray-600">
        {isEditing
          ? "Update the product details below."
          : "Enter the details for your new product."}
      </p>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-lg border bg-white p-6"
      >
        <div>
          <label htmlFor="name" className="mb-1 block">
            Product name
          </label>
          <input
            id="name"
            className="w-full rounded border p-2"
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="price" className="mb-1 block">
            Price (₹)
          </label>
          <input
            id="price"
            className="w-full rounded border p-2"
            type="number"
            name="price"
            min="0"
            step="0.01"
            value={product.price}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="stock" className="mb-1 block">
            Stock
          </label>
          <input
            id="stock"
            className="w-full rounded border p-2"
            type="number"
            name="stock"
            min="0"
            step="1"
            value={product.stock}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="image" className="mb-1 block">
            Image URL
          </label>
          <input
            id="image"
            className="w-full rounded border p-2"
            type="text"
            name="image"
            value={product.image}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="category" className="mb-1 block">
            Category
          </label>
          <select
            id="category"
            className="w-full rounded border p-2"
            name="category"
            value={product.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            <option value="Fresh">Fresh</option>
            <option value="Floral">Floral</option>
            <option value="Amber">Amber</option>
            <option value="Musk">Musk</option>
            <option value="Woody">Woody</option>
          </select>
        </div>

        <div>
          <label htmlFor="description" className="mb-1 block">
            Description
          </label>
          <textarea
            id="description"
            className="w-full rounded border p-2"
            name="description"
            rows={4}
            value={product.description}
            onChange={handleChange}
          />
        </div>

        {formError && (
          <p role="alert" className="text-sm text-red-600">
            {formError}
          </p>
        )}

        {productMutation.isError && !formError && (
          <p role="alert" className="text-sm text-red-600">
            Something went wrong. Please try again.
          </p>
        )}

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={productMutation.isPending}
            className="rounded bg-black px-5 py-2 text-white disabled:opacity-50"
          >
            {productMutation.isPending
              ? "Saving..."
              : isEditing
                ? "Save Changes"
                : "Add Product"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/admin/products")}
            className="rounded border px-5 py-2"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewProduct;
