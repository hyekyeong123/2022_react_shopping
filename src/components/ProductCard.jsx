import React from 'react';
import {useNavigate} from "react-router-dom";

export default function ProductCard(
  {product:{id, image, title, category, price}}
  ) {
  const navigate = useNavigate();
// ******************************************
  // 근데 id가 아니라 product 자체를 넘기고 싶은데
  function goProductDetail() {
    navigate(`/products/${id}`);
  }

  // ******************************************
  return (
    <li className="rounded-lg shadow-md overflow-hidden cursor-pointer" onClick={goProductDetail}>
      <img className="w-full" src={image} alt={title}/>
      <div className="mt-2 px-2 text-lg flex justify-between items-center">
        <h3 className="truncate">{title}</h3>
        <p>`₩${price}`</p>
      </div>
      <p className="mb-2 px-2 text-gray-600">{category}</p>
    </li>
  );
};