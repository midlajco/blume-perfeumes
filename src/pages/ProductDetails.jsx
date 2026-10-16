import { useQuery } from "@tanstack/react-query"
import { getProductById } from "../services/ProductService"
import { useParams, useNavigate } from "react-router-dom";
import { createWishlist, getWishList, updateWishlist } from "../services/WishlistService";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { createCart, getCart, updateCart } from "../services/CartService";

function ProductDetails() {

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from || "/";

    const user = useSelector((state) => state.auth.user);
    const { id } = useParams()



    const { data: product, isLoading, isError } = useQuery({
        queryKey: ["product", id],
        queryFn: () => getProductById(id)

    })

    if (isLoading) return <p>Loading product...</p>;

    if (isError) return <p>Failed to load product.</p>;

    if (!product) return <p>Product not found.</p>;

    const handleAddToWishlist = async () => {
        if (!user) {
            navigate("/login", {
                state: { from: { pathname: `/products/${product.id}` } },
            });
            return;
        }


        const wishlist = await getWishList(user.id)
        if (!wishlist) {
            await createWishlist(user.id, product.id);
            return
        }
        const existing = wishlist.items.some((item) => (item.productId) === product.id);
        if (existing) {
            alert("already added");
            return
        }
        const newItem = {
            productId: product.id,
            name: product.name,
            image: product.image,
            category: product.category,

        }
        const updatedItems = [
            ...wishlist.items,
            newItem
        ];
        await updateWishlist(wishlist.id, updatedItems)

    }

    const handleAddtoCart = async () => {
        if (!user) {
            navigate("/login", {
                state: { from: { pathname: `/products/${product.id}` } },
            });
            return;

        }
        const newItem =         {
                productId: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1
            }
        const cart = await getCart(user.id);
        if (!cart) {
            await createCart(user.id,newItem);
            return
                
        }
        const items=cart.items;

        const updatedItems =[
            ...items,newItem
        ]
        await updateCart(cart.id,updatedItems)
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

                <button
                    onClick={handleAddtoCart}
                    className="mb-3 w-full border p-3">
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