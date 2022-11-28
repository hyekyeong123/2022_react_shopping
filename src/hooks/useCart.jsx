import React from 'react';
import {useAuthContext} from "../context/AuthContext";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {
  addOrUpdateToCart,
  deleteFromCart,
  getCart as fiGetCart
} from "../api/firebase";

export default function useCart() {
  const {uid} = useAuthContext();
  const queryClient = useQueryClient();

  // 장바구니 목록 가져오기(사용자 별로 cash)
  const cartQuery = useQuery(['carts', uid || ''], () => fiGetCart(uid),{

    // uid가 있는 경우에만 실행
    enabled : !!uid
  })

  // 장바구니 추가 또는 업데이트
  const addOrUpdateItem = useMutation(
    (product) => addOrUpdateToCart(uid, product),{
      onSuccess: () => {
        queryClient.invalidateQueries(['carts', uid]);
      }
    }
  )

  const removeItem = useMutation(
    (deleteCartId) => deleteFromCart(uid, deleteCartId),{
      onSuccess:()=>{
        queryClient.invalidateQueries(['carts',uid])
      }
    }
  )
  return {cartQuery, addOrUpdateItem, removeItem};
};