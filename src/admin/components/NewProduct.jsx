import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react'
import { createProduct } from '../../services/ProductService';
import { useNavigate } from 'react-router-dom';

function NewProduct() {

    const queryClient = useQueryClient();
    const navigate = useNavigate();


    const [product, setProduct] = useState({
        name: "",
        category: "",
        description: "",
        price: "",
        stock: "",
        image: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: value,
        })
    }

    const createMutation = useMutation({
        mutationFn: (product) => createProduct(product),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["products"],
            })
            navigate("/admin/products")
            setProduct({

            name: "",
            category: "",
            description: "",
            price: "",
            stock: "",
            image: "",
        })
        }

    })

    const handleSubmit = (e) => {
        e.preventDefault();

        const newProduct = {
            ...product,price:Number(product.price),stock:Number(product.stock),
            isDeleted: false
        }
        createMutation.mutate(newProduct)

        setProduct({

            name: "",
            category: "",
            description: "",
            price: "",
            stock: "",
            image: "",
        })

    }



    return (
        <div>

           <form  onSubmit={handleSubmit}>
             <label>name</label>
            <input className='border' type="text" value={product.name} name="name" onChange={handleChange} required />

            <label>price</label>
            <input className='border'  type="number" value={product.price} name="price" onChange={handleChange} required />
            <label >image</label>
            <input className='border' type="text" name='image' value={product.image} onChange={handleChange} />

            <label>cata</label>
            <select name="category" value={product.category} onChange={handleChange} required  >
               <option value="">Select Category</option>
                <option value="Fresh">Fresh</option>
                <option value="Floral">Floral</option>
                <option value="Amber">Amber</option>
                <option value="Musk">Musk</option>
                <option value="Woody">Woody</option>
            </select>
            <textarea className='border' name="description" value={product.description} onChange={handleChange} />
            <input className='border' type="number" value={product.stock} name="stock" onChange={handleChange} />
            <button type='submit'className='bg-black' >add</button>

           </form>
           
        </div>
    )
}

export default NewProduct