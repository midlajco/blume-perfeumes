import { useQuery } from "@tanstack/react-query"
import { getProductById } from "../services/ProductService"
import { useParams, useNavigate } from "react-router-dom";
import { createWishlist, getWishList, updateWishlist } from "../services/WishlistService";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { createCart, getCart, updateCart } from "../services/CartService";
import { useState, useEffect } from "react";

function ProductDetails() {
    const [addedToCart, setAddedTocart] = useState(false)
    const [addedToWishList, setAddedToWishList] = useState(false)

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from || "/";

    const user = useSelector((state) => state.auth.user);
    const { id } = useParams()



    const { data: product, isLoading, isError } = useQuery({
        queryKey: ["product", id],
        queryFn: () => getProductById(id)

    })

    useEffect(() => {
        const checkCart = async () => {
            if (!user || !product?.id) {
                setAddedTocart(false);
                return;
            }

            try {
                const cart = await getCart(user.id);
                const exists = cart?.items?.some(
                    (item) =>
                        String(item.productId) === String(product.id)
                );

                setAddedTocart(!!exists);
            } catch (error) {
                console.error("Failed to check cart:", error);
            }
        };

        checkCart();
    }, [user, product?.id]);

    useEffect(() => {
        const checkWishlist = async () => {
            if (!user || !product?.id) {
                setAddedToWishList(false);
                return;
            }

            try {
                const wishlist = await getWishList(user.id);
                const exists = wishlist?.items?.some(
                    (item) =>
                        String(item.productId) === String(product.id)
                );

                setAddedToWishList(!!exists);
            } catch (error) {
                console.error("Failed to check wishlist:", error);
            }
        };

        checkWishlist();
    }, [user, product?.id]);

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
        if (addedToWishList) {
            navigate("/wishlist");
            return;
        }
        const newItem = {
            productId: product.id,
            name: product.name,
            description: product.description,

            image: product.image,
            category: product.category,
            price: product.price


        }
        const wishlist = await getWishList(user.id)

        if (!wishlist) {
            await createWishlist(user.id, newItem)

            return
        }
        const existing = wishlist.items.some((item) => (item.productId) === product.id);
        if (existing) {
            alert("already added");
            return
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
        const newItem = {
            productId: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            category: product.category,

            quantity: 1
        }
        const cart = await getCart(user.id);
        if (!cart) {
            await createCart(user.id, newItem);
            setAddedTocart(true)
            return

        }
        const items = cart.items;
        let updatedItems;
        const existingItem = cart.items.some((item) => (item.productId) === product.id);
        if (existingItem) {
            updatedItems = cart.items.map((item) =>
                item.productId === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        } else {
            updatedItems = [
                ...items,
                newItem
            ];
        }
        await updateCart(cart.id, updatedItems)
        setAddedTocart(true);
    }

    return (
        <main className="min-h-screen bg-[#f7f5f0] text-[#171614]">

            {/* Product details */}
            <section className="mx-auto min-h-[calc(100vh-80px)] max-w-[1600px] px-5 pb-12 pt-24 sm:px-8 md:px-[4.5%] md:pt-28">

                {/* Breadcrumb */}
                <nav className="mb-5 flex flex-wrap items-center gap-2 text-[10px] text-[#827c74] md:mb-8">
                    <button
                        onClick={() => navigate("/")}
                        className="transition-colors hover:text-black"
                    >
                        Home
                    </button>
                    <span>/</span>
                    <button
                        onClick={() => navigate("/shop")}
                        className="transition-colors hover:text-black"
                    >
                        Fragrances
                    </button>
                    <span>/</span>
                    <span className="text-[#514b44]">{product.name}</span>
                </nav>

                <div className="grid grid-cols-1 items-start gap-6 sm:gap-10 md:grid-cols-2 md:gap-12 lg:gap-20">

                    {/* Product image */}
                    <div className="flex h-[350px] items-center justify-center sm:h-[450px] md:sticky md:top-24 md:h-[540px]">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-contain"
                        />
                    </div>

                    {/* Product information */}
                    <div className="flex w-full flex-col justify-center pt-2 sm:pt-5 md:pt-4 lg:pt-5">

                        <span className="mb-5 w-fit bg-[#eee7dd] px-3 py-2 text-[9px] uppercase tracking-[0.16em] text-[#776b5d]">
                            {product.category}
                        </span>

                        <h1 className="font-serif text-4xl leading-[1.12] tracking-[-0.045em] sm:text-5xl lg:text-[54px]">
                            {product.name}
                        </h1>

                        <p className="mt-3 text-sm text-[#786f66]">
                            Eau de Parfum
                        </p>

                        <p className="mt-6 font-serif text-3xl tracking-tight sm:text-4xl">
                            ₹{Number(product.price).toLocaleString("en-IN")}
                        </p>

                        <p className="mt-5 max-w-xl text-sm leading-7 text-[#786f66]">
                            {product.description}
                        </p>

                        {/* Add to cart */}
                        <button
                            onClick={() => {
                                if (addedToCart) {
                                    navigate("/cart")
                                }
                                else {
                                    handleAddtoCart()
                                }
                            }}
                            className="mt-7 flex min-h-[58px] w-full items-center justify-center bg-[#171614] px-6 py-4 text-sm text-white transition-colors duration-300 hover:bg-[#37332e]"
                        >{addedToCart ? "Go to Cart" : "Add to Cart"}

                        </button>

                        {/* Add to wishlist */}
                        <button
                            onClick={handleAddToWishlist}
                            className="mt-2 flex min-h-[58px] w-full items-center justify-center gap-2 border border-[#b8b2aa] bg-transparent px-6 py-4 text-sm transition-colors duration-300 hover:border-[#171614] hover:bg-[#eeeae4]"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
                            </svg>
                            {addedToWishList ? "Go to Wishlist" : "Add to Wishlist"}
                        </button>

                        {/* Additional product information */}
                        <div className="mt-8 border-t border-black/10 pt-5">
                            <div className="flex items-center justify-between py-3">
                                <span className="text-[10px] uppercase tracking-[0.15em] text-[#655e55]">
                                    Fragrance family
                                </span>
                                <span className="text-xs">{product.category}</span>
                            </div>

                            <div className="flex items-center justify-between border-t border-black/10 py-3">
                                <span className="text-[10px] uppercase tracking-[0.15em] text-[#655e55]">
                                    Collection
                                </span>
                                <span className="text-xs">Fine Fragrances</span>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

        </main>
    );

}

export default ProductDetails;