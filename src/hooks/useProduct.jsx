import React from 'react';
import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import {
  getProducts as fiGetProducts,
  addNewProduct,
} from "../api/firebase";

// 훅으로 관리하면 한번에 파악할 수 있어 관리하기가 수월함
export default function useProduct() {
  const queryClient = useQueryClient();

  // 상품 가져오기
  const productsQuery = useQuery(['products'], fiGetProducts, {
    staleTime : 1000 * 60
  })

 // 상품 추가
  const addProduct = useMutation(
    ({product, url}) => addNewProduct(product, url),
    {
      onSuccess: () => queryClient.invalidateQueries(['products'])
    }
  )
  return {productsQuery, addProduct};
};