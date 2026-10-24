import React, { useState } from 'react'
import { getProducts } from '../services/ProductService'
import { useQuery } from '@tanstack/react-query';
import ProductCard from '../components/shop/ProductCard';

function Shop() {
    const [searchTerm, setSearchTerm] = useState("");
    const [category, setCategory] = useState("All");
    const [sortBy, setSortBy] = useState("Low");

    const { data: products, isLoading, isError } = useQuery({
        queryKey: ["products"],
        queryFn: getProducts

    })
    if (isLoading) {
        return <p>Loading Products</p>
    }
    if (isError) {
        return <p>Failed to Load products</p>
    }
    if (products.length === 0) {
        return <p>No Products Available</p>
    }
    const filteredProducts =
        products.filter((product)=>product.isDeleted===false).filter((product) => product.name.toLowerCase().includes(searchTerm.toLocaleLowerCase()))
            .filter((product) => category === "All" || product.category === category)
            .sort((a, b) => {
                if (sortBy === "Low") return a.price - b.price;
                if (sortBy === "High") return b.price - a.price;
                return 0;
            })


    return (
        <main className="min-h-screen bg-[#f7f5f1] text-[#171614]">

            {/* Hero banner */}
            <section className="relative flex min-h-[260px] items-end overflow-hidden border-b border-black/10 bg-[#e7e2db] px-6 pb-10 pt-28 sm:min-h-[300px] sm:px-10 sm:pb-12 md:px-[7.5%]">
                <img
                    src="/images/shop/shop-hero.png"
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-r from-[#f4f1ed]/95 via-[#f4f1ed]/65 to-transparent" />

                <div className="relative z-10">
                    <p className="mb-4 text-[10px] uppercase tracking-[0.32em] text-[#55504a]">
                        Fragrances
                    </p>

                    <h1 className="text-5xl leading-none tracking-[-0.04em] sm:text-6xl md:text-7xl">
                        All Fragrances
                    </h1>

                    <p className="mt-5 text-[10px] uppercase tracking-[0.24em] text-[#55504a] sm:text-xs">
                        Distinct characters. A shared journey.
                    </p>
                </div>
            </section>

            {/* Filter toolbar */}

            <section className="border-y border-black/10 bg-[#f5f2ec] px-4 sm:px-8 md:px-[4.5%]">
                <div className="flex min-h-[62px] flex-wrap items-center justify-between gap-4 py-3 lg:flex-nowrap">

                    {/* Filters */}
                    <div className="flex flex-wrap items-center gap-x-5 gap-y-3 sm:gap-x-6">

                        <span className="whitespace-nowrap text-[9px] uppercase tracking-[0.2em] text-stone-700">
                            Filter by
                        </span>

                        <div className="flex items-center gap-3 border-l border-black/10 pl-4 sm:pl-5">


                            <select
                                id="category-filter"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="max-w-28 cursor-pointer bg-transparent text-[10px] text-stone-800 outline-none"
                            >
                                <option value="All">All Categories</option>
                                <option value="Fresh">Fresh</option>
                                <option value="Floral">Floral</option>
                                <option value="Amber">Amber</option>
                                <option value="Musk">Musk</option>
                                <option value="Woody">Woody</option>
                            </select>
                        </div>

                        <div className="hidden h-6 w-px bg-black/10 sm:block" />

                        <div className="flex items-center gap-3">
                            <label
                                htmlFor="search-fragrances"
                                className="sr-only"
                            >
                                Search fragrances
                            </label>

                            <div className="flex h-8 w-44 items-center gap-2 rounded-[3px] border border-black/15 px-2 sm:w-56 md:w-[266px]">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    className="shrink-0 text-stone-600"
                                    aria-hidden="true"
                                >
                                    <circle cx="11" cy="11" r="7" />
                                    <path d="m20 20-4-4" />
                                </svg>

                                <input
                                    id="search-fragrances"
                                    type="text"
                                    placeholder="Find a scent..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full bg-transparent text-[10px] text-stone-800 outline-none placeholder:text-stone-400"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Sorting */}
                    <div className="flex items-center gap-3">
                        <span className="whitespace-nowrap text-[9px] uppercase tracking-[0.2em] text-stone-700">
                            Sort by
                        </span>

                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="max-w-40 cursor-pointer bg-transparent text-[10px] text-stone-800 outline-none"
                        >
                            <option value="Low">Price: Low to High</option>
                            <option value="High">Price: High to Low</option>
                        </select>
                    </div>

                </div>
            </section>



            {/* Products */}
            <section className="px-4 pb-20 pt-4 sm:px-6 md:px-[4.5%] md:pt-5">
                {filteredProducts.length === 0 ? (
                    <div className="flex min-h-64 flex-col items-center justify-center text-center">
                        <h2 className="text-3xl">No fragrances found</h2>
                        <p className="mt-3 text-sm text-[#77716a]">
                            Try a different search or fragrance family.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-3 sm:gap-x-4 lg:grid-cols-4 lg:gap-x-4 lg:gap-y-10">
                        {filteredProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                            />
                        ))}
                    </div>
                )}
            </section>

        </main>
    )


}

export default Shop;