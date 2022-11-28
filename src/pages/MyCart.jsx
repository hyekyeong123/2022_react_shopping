import React from 'react';
import {useAuthContext} from "../context/AuthContext";
import PriceCard from "../components/PriceCard";
import {BsFillPlusCircleFill} from "react-icons/bs";
import {FaEquals} from "react-icons/fa";
import CartItem from "../components/CartItem";
import Button from "../components/ui/Button";
import useCart from "../hooks/useCart";

export default function MyCart() {
  const {uid} = useAuthContext();
  // const {isLoading, data:products} = useQuery(['carts'],() => getCart(uid));
  const {cartQuery : {isLoading, data:products}} = useCart();

  const totalPrice = products
    && products.reduce(
      (prev, current) =>
        prev + parseInt(current.price) * current.quantity, 0);
  const deliveryFee = 3000;
  // ******************************************
  if(isLoading) return <p>Loading...</p>
  const hasProducts = products && products.length > 0;
  console.log("[JHG] MyCart products : "+JSON.stringify(products));
  // *****************
  return (
    <section className="p-8 flex flex-col">
      <p className="text-2xl text-center font-bold mb-6 pb-4 border-b border-gray-300">내 장바구니</p>
      {!hasProducts && <p>장바구니에 상품이 없습니다.</p>}

      {hasProducts && <>
        <ul className="border-b border-gray-300 mb-8 p-4 px-8">
          {products && products.map((product) => <CartItem key={product.id} product={product}/>)}
        </ul>
        <div className="flex justify-between items-center px-2 md:px-8 lg:px-16">
          <PriceCard text="상품 총액" price={totalPrice}/>
          <BsFillPlusCircleFill className="shrink-0"/>
          <PriceCard text="배송액" price={deliveryFee}/>
          <FaEquals  className="shrink-0"/>
          <PriceCard text="총가격" price={totalPrice + deliveryFee}/>
        </div>
        <Button text="주문하기"/>
      </>}
    </section>
  );
}
