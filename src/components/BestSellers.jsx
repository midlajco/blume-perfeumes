
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../services/ProductService';
import { Link } from 'react-router-dom';

function Bestsellers() {
  const {
    data: products = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });

  if (isLoading) return <p>Loading bestsellers...</p>;
  if (isError) return <p>Failed to load bestsellers.</p>;

  const bestsellers = products.slice(0, 4);

   return (
    <section className="bg-[#e9e4dd] px-2 py-10 md:px-8">
      <div className="mb-6 flex items-end justify-between gap-4 border-b border-[#c9c1b7] px-4 pb-5 md:px-8">
        <div>
          <p className="mb-2 text-[10px] tracking-[0.25em]">
            BESTSELLERS
          </p>
          <h2 className="font-serif text-4xl tracking-tight text-[#171614] md:text-6xl">
            Our most loved.
          </h2>
        </div>

        <Link
          to="/products"
          className="mb-2 hidden border-l border-[#bcb3a8] pl-5 text-xs tracking-wide sm:block"
        >
          VIEW ALL ↗
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-4">
        {bestsellers.map((product, index) => (
          <article
            key={product.id}
            className="border border-[#d0c8be] bg-[#e9e4dd]"
          >
            <Link
              to={`/products/${product.id}`}
              className="block overflow-hidden bg-[#d9d1c6]"
            >
              <img
                src={product.image}
                alt={product.name}
                className="aspect-[4/4] w-full object-cover"
              />
            </Link>

            <div className="p-4 md:p-6">
              <div className="mb-3 flex items-center gap-3">
                <span className="text-[10px] text-[#514b44]">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="h-px w-14 bg-[#c7beb3]" />
              </div>

              <h3 className="text-xs font-medium uppercase tracking-[0.22em] text-[#24211e]">
                {product.name}
              </h3>

              <p className="mt-2 line-clamp-1 text-[11px] text-[#81796f]">
                {product.notes || product.description || product.catagory}
              </p>

              <div className="mt-3 flex items-center justify-between">
                <p className="text-sm text-[#24211e]">
                  ₹{Number(product.price).toLocaleString('en-IN')}
                </p>

                <Link
                  to={`/products/${product.id}`}
                  aria-label={`View ${product.name}`}
                  className="text-xl text-[#39342e]"
                >
                  ↗
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      <Link
        to="/shop"
        className="mt-5 inline-block text-xs tracking-wide sm:hidden"
      >
        VIEW ALL ↗
      </Link>
    </section>
  );
}

export default Bestsellers;
