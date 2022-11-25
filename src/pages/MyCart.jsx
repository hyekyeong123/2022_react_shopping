import React from 'react';
import {getCart} from "../api/firebase";
import {useQuery} from "@tanstack/react-query";
import {useAuthContext} from "../context/AuthContext";
import * as PropTypes from "prop-types";
import PriceCard from "../components/PriceCard";
import {BsFillPlusCircleFill} from "react-icons/bs";
import {FaEquals} from "react-icons/fa";

function CartItem(props) {
  return null;
}

CartItem.propTypes = {product: PropTypes.any};
export default function MyCart() {
  const {uid} = useAuthContext();
  const {isLoading, data:products} = useQuery(['carts'],() => getCart(uid));

  const totalPrice = products
    && products.reduce(
      (prev, current) =>
        prev + parseInt(current.price) * current.quantity, 0);
  const deliveryFee = 3000;
  // ******************************************
  if(isLoading) return <p>Loading...</p>
  console.log("[JHG] prodcut : "+products);
  const hasProducts = products && products.length > 0;
  // *****************
  return (
    <section>
      <p>내 장바구니</p>
      {!hasProducts && <p>장바구니에 상품이 없습니다.</p>}

      {hasProducts && <>
        <ul>
          {products && products.map((product) => <CartItem key={product.id} product={product}/>)}
        </ul>
        <div>
          <PriceCard text="상품 총액" price={totalPrice}/>
          <BsFillPlusCircleFill/>
          <PriceCard text="배송액" price={deliveryFee}/>
          <FaEquals/>
          <PriceCard text="총가격" price={totalPrice + deliveryFee}/>
        </div>
      </>}
    </section>
  );
}
