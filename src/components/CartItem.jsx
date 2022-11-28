import React from 'react';
import {AiOutlineMinusSquare, AiOutlinePlusSquare} from "react-icons/ai";
import {RiDeleteBin4Fill} from "react-icons/ri";
import useCart from "../hooks/useCart";

const ICON_CLASS = "transition-all cursor-pointer hover:text-brand hover:scale-105 mx-1"

export default function CartItem({
  product,
  product:{id, image, title, option, quantity, price},
}) {
  console.log("[JHG] CartItem prodcut : "+JSON.stringify(product));

  const handleMinus = () => {
    if(quantity < 2) return;
    // addOrUpdateToCart(uid, {...product, quantity : quantity - 1});
    addOrUpdateItem.mutate({...product, quantity : quantity - 1})
  }
  const handlePlus = () => {
    addOrUpdateItem.mutate({...product, quantity : quantity + 1})
  }
  const handleDelete = () => {
    removeItem.mutate(id);
  }

  const {addOrUpdateItem, removeItem} = useCart();
  // ******************************************
  return (
    <li className="flex justify-between my-2 items-center">
      <img src={image} alt={title} className="w-24 md:w-48 rounded-lg"/>
      <div className="flex-1 flex justify-between ml-4">
        <div className="basis-3/5">
          <p className="text-lg">{title}</p>
          <p className="text-xl font-bold text-brand">{option}</p>
          <p>￦{price}</p>
        </div>
        <div className="text-2xl flex items-center">
          <AiOutlineMinusSquare className={ICON_CLASS} onClick={handleMinus}/>
          <span>{quantity}</span>
          <AiOutlinePlusSquare className={ICON_CLASS} onClick={handlePlus}/>
          <RiDeleteBin4Fill className={ICON_CLASS} onClick={handleDelete}/>
        </div>
      </div>
    </li>
  );
};