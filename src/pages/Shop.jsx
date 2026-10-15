import React, { useState } from 'react'
import { getProducts } from '../services/ProductService'
import { useQuery } from '@tanstack/react-query';

function Shop() {
    const [searchTerm, setSearchTerm] = useState("");
    const [category, setCategory] = useState("All");
    const [sortBy, setSortBy] = useState("low");

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
        products.filter((product) => product.name.toLowerCase().includes(searchTerm.toLocaleLowerCase()))
        .filter((product) => category === "All" || product.category === category)
        .sort((a,b)=>{
            if(sortBy === "Low")return a.price-b.price;
            if(sortBy==="High")return b.price -a.price;
            return 0;
        })
    return (
        <div className='mt-10' >
            <h1>shop</h1>
            <div className="mx-auto p-6" >
                <input type="text"
                    placeholder='Search....'
                    onChange={(e) => setSearchTerm(e.target.value)}
                    value={searchTerm}
                    className="w-full p-3 border border-gray-300 rounded-lg
                 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select onChange={(e) => setCategory(e.target.value)} >
                    <option value="All">All Categories</option>
                    <option value="Fresh">Fresh</option>
                    <option value="Floral">Floral</option>
                    <option value="Amber">Amber</option>
                    <option value="Musk">Musk</option>
                    <option value="Woody">Woody</option>
                </select>
                <select onChange={(e)=>(setSortBy(e.target.value))} >
                    <option value="High">High to Low</option>
                    <option value="Low">Low to High</option>
                    
                </select>
            </div>
            
            <div>
                { filteredProducts.length === 0 ?(
                    <p>No products mathc your search.</p>)
                    :(
                    filteredProducts.map((product) => (
                        <div key={product.id} >
                            {product.name}
                            {product.price}
                        </div>
                    ))
               ) }


            </div>

        </div>
    )
}

export default Shop ;