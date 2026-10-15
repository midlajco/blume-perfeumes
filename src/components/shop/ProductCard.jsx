import React from 'react'

function ProductCard({product}) {
  return (
    <div>
        <img src={product.imagae} alt={product.name} />
        <button>
            <Heart size={18} strokeWidth={1.5} ></Heart>
        </button>
        <div>
            <h2>{product.name}</h2>
            <p>{product.category}</p>
            <p>{product.price}</p>
            <p>{product.description}</p>
        </div>
    </div>
  )
}

export default ProductCard