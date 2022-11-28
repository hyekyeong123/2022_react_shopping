import React from 'react';
import ProductCard from "./ProductCard";
import useProduct from "../hooks/useProduct";

export default function Products() {
  // const {isLoading, error, data:products}
  //   = useQuery(['products'], getProducts, {staleTime : 1000 * 60});
  const {productsQuery : {isLoading, error, data:products}} = useProduct(); // V2. Hook 사용하기
  // ******************************************
  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul className="grid grid-cols-1 md:grid-col-3 lg:grid-cols-4 gap-4 p-4">
        {products && products.map(product =>
          <ProductCard key={product.id} product={product}/>
        )}
      </ul>
    </>
  );
};