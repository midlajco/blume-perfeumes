import { useQuery } from "@tanstack/react-query"
import { getProductById } from "../services/ProductService"

function ProductDetails() {
    const { data: product, isLoading, isError } = useQuery({
        queryKey: ["product", id],
        queryFn: () => getProductById(id)

    })

    if (isLoading) return <p>Loading product...</p>;

    if (isError) return <p>Failed to load product.</p>;

    if (!product) return <p>Product not found.</p>;
    return (
        <div>

        </div>
    )
}

export default ProductDetails