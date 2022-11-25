import React from 'react';

export default function CartItem({
  product,
  product:{id, image, title, option, quantity, price}
}) {
  console.log("[JHG] prodcut : "+product);

 // ******************************************
  return (
    <li>
      <img src={image} alt={title}/>
    </li>
  );
};