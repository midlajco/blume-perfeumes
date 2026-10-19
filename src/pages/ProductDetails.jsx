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
    }

    
return (
    <main className="min-h-screen bg-[#f7f5f1] px-5 pb-16 pt-28 text-[#171614] sm:px-8 md:px-[5.2%] md:pt-32">

        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-3 text-xs text-[#746d65]">
            <button onClick={() => navigate("/")}>Home</button>
            <span>/</span>
            <button onClick={() => navigate("/shop")}>Fragrances</button>
            <span>/</span>
            <span className="text-[#171614]">{product.name}</span>
        </nav>

        {/* Product layout */}
       
{/* Filter toolbar */}
<section className="border-y border-[#d8d2ca] bg-[#f7f5f1] px-5 sm:px-8 md:px-[4.5%]">
    <div className="flex min-h-[68px] flex-wrap items-center justify-between gap-4 py-3 lg:flex-nowrap">

        <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <span className="font-sans text-[9px] uppercase tracking-[0.22em] text-[#625b53]">
    Filter by
</span>

            <div className="flex items-center gap-3 border-l border-[#ddd6ce] pl-5">
                <label htmlFor="category-filter" className="whitespace-nowrap font-serif text-base">
    Fragrance Family
</label>

                <select
                    id="category-filter"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="max-w-36 cursor-pointer bg-transparent text-sm outline-none"
                >
                    <option value="All">All Categories</option>
                    <option value="Fresh">Fresh</option>
                    <option value="Floral">Floral</option>
                    <option value="Amber">Amber</option>
                    <option value="Musk">Musk</option>
                    <option value="Woody">Woody</option>
                </select>
            </div>

            <div className="flex items-center gap-3 border-l border-[#ddd6ce] pl-5">
                <label htmlFor="search-fragrances" className="text-sm">
                    Search
                </label>

                <input
                    id="search-fragrances"
                    type="text"
                    placeholder="Find a scent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-28 bg-transparent text-sm outline-none placeholder:text-[#928a81] focus:placeholder:text-[#b7afa6] sm:w-32"
                />
            </div>
        </div>

        <div className="flex items-center gap-4 border-l border-[#ddd6ce] pl-5">
            <span className="whitespace-nowrap text-[9px] uppercase tracking-[0.2em]">
                Sort by
            </span>

            <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="max-w-40 cursor-pointer bg-transparent text-sm outline-none"
            >
                <option value="Low">Price: Low to High</option>
                <option value="High">Price: High to Low</option>
            </select>
        </div>

    </div>
</section>

    </main>
);


}

export default ProductDetails