import { useQuery } from "@tanstack/react-query"
import { getProductById } from "../services/ProductService"
import { useParams, } from "react-router-dom";
import { getWishList } from "../services/WishlistService";

function ProductDetails() {
    const user = useSelector((state) => state.auth.user);
    const {id} = useParams()
    console.log(id)
    const { data: product, isLoading, isError } = useQuery({
        queryKey: ["product", id],
        queryFn: () => getProductById(id)

    })

    if (isLoading) return <p>Loading product...</p>;

    if (isError) return <p>Failed to load product.</p>;

    if (!product) return <p>Product not found.</p>;

    const handleAddToWishlist  =async()=>{
        if(!user){
            alert("please login")

        }
        const wishlist =await getWishList(user.id)
        if(!wishlist){

        }
    }
    return (

        <div className="grid gap-6 p-6 md:grid-cols-2">

            <img
                src={product.image}
                alt={product.name}
                className="w-full rounded"
            />

            <div>
                <p>{product.catagory}</p>
                <h1 className="my-2 text-3xl font-bold">
                    {product.name}
                </h1>

                <p className="my-4 text-xl">
                    ₹{product.price}
                </p>

                <p className="mb-6">{product.description}</p>

                <button className="mb-3 w-full bg-black p-3 text-white">
                    Buy Now
                </button>

                <button className="mb-3 w-full border p-3">
                    Add to Cart
                </button>

                <button 
                onClick={handleAddToWishlist}
                  className="w-full border p-3">
                    ♡ Add to Wishlist
                </button>
            </div>

        </div>
    );

}

export default ProductDetails