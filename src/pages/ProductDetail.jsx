import React from 'react';
import {useParams} from "react-router-dom";

export default function ProductDetail() {
  const productId = useParams().id;
  // ******************************************
  return (
    <div>
      Product Details
    </div>
  );
}
